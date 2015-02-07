/// <reference path="ModuleDefinition.ts" />

module ModuleDefinition {

    export class EndlessScroll {

        private _currentPage: number = 1;
        private _lastPage: number = 1;
        private _numberOfPages: number = -1;
        private _isLoading: boolean = false;
        private _stopped: boolean = false;

        private _pages: { [i: number]: any; } = {};
        private _pagesUrl: { [i: number]: string; } = {};

        get stopped(): boolean {
            return this._stopped;
        }
        set stopped(v:boolean) {
            this._stopped = v;
        }
        get currentPage():number {
            return this._currentPage;
        }

        get lastPage(): number {
            return this._numberOfPages;
        }

        get reverseItems(): boolean {
            return false;
        }

        hasPages(dom): boolean {
            return $(dom).find('.pagination__navigation').length != 0;
        }

        getNavigationElement(dom): JQuery {
            return $(dom).find('.pagination').first();
        }

        createPageContainerElement(): JQuery {
            throw 'createPageContainerElement() not implemented';
        }

        getItemsElement(dom): JQuery {
            throw 'getItemsElement() not implemented';
        }

        getItems(dom): JQuery {
            throw 'getItems() not implemented';
        }

        createControlElement(el:JQuery): void {
            var controlContainer = $('<div>').addClass('pull-right').addClass('endless_control_element');
            var controlStartStop = $('<a>').attr('href', '#').append('<i class="fa fa-pause"></i>').attr('title', 'Pause/Resume endless scrolling');

            controlStartStop.click(() => {
                this.stopped = !this.stopped;

                $('.endless_control_element a i.fa').toggleClass('fa-pause').toggleClass('fa-play');

                return false;
            });

            controlContainer.append(controlStartStop);

            el.append(controlContainer);
        }

        createLoadingElement(): JQuery {
            var el = $('<div class="table__heading loading_es"><div class="table__column--width-fill"><p><i class="fa fa-refresh fa-spin"></i> Loading next page...</p></div></div>');
            this.createControlElement(el.find('p'));

            return el;
        }

        createPageElement(page: number): JQuery {

            var el = $('<div class="table__heading"><div class="table__column--width-fill"><p></p></div></div>');

            if (page > 0) {
                if (this._numberOfPages > 0)
                    el.find('p').text('Page ' + page + ' of ' + this._numberOfPages);
                else
                    el.find('p').text('Page ' + page);
            } else {
                el.find('p').text('Last page ends here');
            }

            this.createControlElement(el.find('p'));

            return el;
        }

        loadNextPage(): void {
            if (this._isLoading || this._stopped) {
                return;
            }

            this._isLoading = true;

            if (!this.reverseItems) {
                this._currentPage++;

                if (this._currentPage > this._lastPage) {
                    return;
                }
            } else {
                this._currentPage--;

                if (this._currentPage < 1) {
                    return;
                }
            }

            this.loadPage(this._currentPage);
        }

        loadPage(page: number): void {

            if (!(this._currentPage in this._pagesUrl)) {
                throw 'No URL for page ' + this._currentPage;
            }

            var url = this._pagesUrl[this._currentPage];
            
            var diff = -1;
            var target = -1;

            // Get nearest page
            $.each(this._pages, function (i, el) {
                var thisDiff = Math.abs(i - page);

                if (target == -1 || diff > thisDiff) {
                    target = i;
                    diff = thisDiff;
                }
            });

            var pageContainer = this.createPageContainerElement();
            var loadingElement = this.createLoadingElement();

            pageContainer.append(loadingElement);

            this._pages[page] = {
                element: pageContainer,
                loaded: false,
            }

            var elPage: JQuery = this._pages[target].element;

            if ((target < page && !this.reverseItems) || (target > page && this.reverseItems)) {
                elPage.after(pageContainer);
            } else {
                elPage.before(pageContainer);
            }

            $.get(url,(data) => {

                var dom = $.parseHTML(data);

                this.beforeAddItems(dom);

                var itemsContainer = this.getItemsElement(dom);

                this.addItems(itemsContainer, pageContainer);

                pageContainer.prepend(this.createPageElement(page));

                // Update navigation on page
                var newPagination = this.getNavigationElement(dom);
                this.getNavigationElement(document).html(newPagination.html());

                // Cache urls for pages
                this.parseNavigation(newPagination);

                this.afterAddItems(pageContainer);

                this._pages[page].loaded = true;

                loadingElement.remove();

                this._isLoading = false;
            });
        }

        beforeAddItems(dom): void {
        }

        addItems(dom, pageContainer: JQuery): void {
            this.getItems(dom).each((i: number, el: Element) => {
                if (this.reverseItems) {
                    pageContainer.prepend(el);
                }
                else {
                    pageContainer.append(el);
                }
            });
        }

        afterAddItems(pageContainer: JQuery): void {
        }

        parseNavigation(dom: JQuery): void {
            dom.find('.pagination__navigation a').each((i: number, el: Element) => {
                var $el = $(el);
                var page = parseInt($el.data('page-number'));

                this._pagesUrl[page] = $el.attr('href');

                if (page > this._lastPage)
                    this._lastPage = page;
            });
        }

        preparePage(): void {
            var nav = this.getNavigationElement(document);

            // Don't do anything if no results
            if (nav.hasClass('pagination--no-results'))
                return;

            if (!this.hasPages(document)) {
                this._currentPage = 1;
                this._lastPage = 1;
            } else {

                var elLastPage = nav.find('a').last();

                this._currentPage = parseInt(nav.find('a.is-selected').data('page-number'));
                this._lastPage = parseInt(elLastPage.data('page-number'));

                if (elLastPage.text().trim() == "Last") {
                    this._numberOfPages = this._lastPage;
                }

                this.parseNavigation(nav);
            }

            var itemsElement = this.getItemsElement(document);

            this._pages[this.currentPage] = {
                element: itemsElement,
                loaded: true,
            };

            if (this.reverseItems) {
                this.getItems(itemsElement).each((i: number, el: Element) => {
                    itemsElement.prepend(el);
                });
            }

            itemsElement.prepend(this.createPageElement(this.currentPage));

            $(window).scroll((event) => {
                var scrollPos = $(window).scrollTop() + $(window).height();

                if (scrollPos > $('div.pagination').position().top - 200) {
                    this.loadNextPage();
                }
            });
        }

    }

}