/// <reference path="../../ModuleDefinition.ts" />

module ModuleDefinition {

    export class EndlessScroll {

        private _maxPage:number = 31337;

        private _nextPage: number = -1;
        private _currentPage: number = 1;
        private _lastPage: number = 1;
        private _numberOfPages: number = -1;
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

        get BaseUrl(): string {
            throw 'BaseUrl() not implmented';
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

        createLoadingElement(): JQuery {
            var el = $('<span class="endless_loading"> - <i class="fa fa-refresh fa-spin"></i> Loading...</span>');
            return el;
        }

        createPageElement(page: number): JQuery {

            var el = $('<div class="table__heading"><div class="table__column--width-fill"><p><span class="endless_page"></span></p></div></div>');

            var $p = el.find('p');

            this.updatePageElement(el, page);

            var controlContainer = $('<div>').addClass('pull-right').addClass('endless_control_element');
            var controlStartStop = $('<a>').attr('href', '#').append('<i class="fa fa-pause"></i>').attr('title', 'Pause/Resume endless scrolling');

            controlStartStop.click(() => {
                this.stopped = !this.stopped;

                $('.endless_control_element a i.fa').toggleClass('fa-pause').toggleClass('fa-play');

                return false;
            });

            controlContainer.append(controlStartStop);

            $p.append(controlContainer);

            return el;
        }

        updatePageElement(el: JQuery, page: number) {
            var text = '';
            if (page > 0) {
                if (this._numberOfPages > 0)
                    text = 'Page ' + page + ' of ' + this._numberOfPages;
                else
                    text = 'Page ' + page;
            } else {
                text = 'Last page ends here';
            }

            el.find('.endless_page').text(text);
        }

        loadNextPage(): void {
            if (this._stopped) {
                return;
            }

            if (this._nextPage > this._lastPage || this._nextPage < 1)
                return;

            this.loadPage(this._nextPage);
        }

        updateNextPage(page:number): void {
            if (this.reverseItems) {
                this._nextPage = page - 1;
            } else {
                this._nextPage = page + 1;
            }
        }

        loadPage(page: number): void {

            if (!(page in this._pagesUrl)) {
                throw 'No URL for page ' + this._currentPage;
            }

            if (!(page in this._pages)) {

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
                var pageHeaderElement = this.createPageElement(page);

                pageHeaderElement.find('p').first().append(loadingElement);
                pageContainer.append(pageHeaderElement);

                this._pages[page] = {
                    element: pageContainer,
                    loaded: false,
                    loading: false,
                    visible: true
                }

                var elPage: JQuery = this._pages[target].element;

                if ((target < page && !this.reverseItems) || (target > page && this.reverseItems)) {
                    elPage.after(pageContainer);
                } else {
                    elPage.before(pageContainer);
                }
            }

            var pg = this._pages[page];

            if (pg.loading) {
                return;
            } else if (pg.loaded) {
                if (!pg.visible) {
                    pg.element.show();
                    pg.visible = true;
                }

                if (this._nextPage == page) {
                    this.updateNextPage(page);
                }
            } else {
                var url = this._pagesUrl[page];

                this._pages[page].loading = true;

                $.get(url,(data) => {

                    var dom = $.parseHTML(data);

                    this.beforeAddItems(dom, page);

                    var itemsContainer = this.getItemsElement(dom);

                    //
                    var newPagination = this.getNavigationElement(dom);
                    var actualPage = parseInt(newPagination.find('a.is-selected').data('page-number'));

                    // Cache urls for pages
                    this.parseNavigation(newPagination);

                    this.addItems(itemsContainer, pageContainer, page);

                    // Ensure correct position for page header
                    pageContainer.prepend(pageHeaderElement);

                    // Update navigation on page               
                    this.getNavigationElement(document).html(newPagination.html());

                    this.afterAddItems(pageContainer, page);

                    this._pages[page].loaded = true;

                    loadingElement.remove();

                    // Update next page. Done here to prevent falsely loading multiple pages at same time.
                    if (this._nextPage == page || this._nextPage == -1) {
                        this.updateNextPage(actualPage);
                    }

                    if (actualPage != page) {
                        this.updatePageElement(pageHeaderElement, actualPage);
                        this._pages[actualPage] = this._pages[page];  
                        delete this._pages[page];
                    }
                });
            }
        }

        beforeAddItems(dom, page:number): void {
        }

        addItems(dom, pageContainer: JQuery, page:number): void {
            this.getItems(dom).each((i: number, el: Element) => {
                if (this.reverseItems) {
                    pageContainer.prepend(el);
                }
                else {
                    pageContainer.append(el);
                }
            });
        }

        afterAddItems(pageContainer: JQuery, page: number): void {
        }

        parseNavigation(dom: JQuery): void {
            var elLastPage = dom.find('a').last();

            this._lastPage = parseInt(elLastPage.data('page-number'));

            if (elLastPage.text().trim() != "Next") {
                this._numberOfPages = this._lastPage;
            }

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
                this._currentPage = parseInt(nav.find('a.is-selected').data('page-number'));

                this.parseNavigation(nav);
            }

            var itemsElement = this.getItemsElement(document);
            var pageHeader = this.createPageElement(this.currentPage);
            var isCommentLink = SGPP.location.hash != '';

            this._pages[this.currentPage] = {
                element: itemsElement,
                loaded: true,
                loading: false,
                visible: true
            };

            if (this.reverseItems) {
                this.getItems(itemsElement).each((i: number, el: Element) => {
                    itemsElement.prepend(el);
                });

                // Load last page if reversed and going to first page and not link to a comment
                if (this._currentPage == 1 && this._numberOfPages != -1 && !isCommentLink) {
                    this._nextPage = this._lastPage;
                    this.loadNextPage();

                    this._pages[this.currentPage].visible = false;
                    itemsElement.hide();
                } else if (this._currentPage == 1 && !isCommentLink) {
                    this._pagesUrl[this._maxPage] = this.BaseUrl + '/search?page=' + this._maxPage;
                    this._pages[this.currentPage].visible = false;
                    itemsElement.hide();
                    this.loadPage(this._maxPage);
                } else {
                    this._nextPage = this._lastPage - 1;
                }
            } else {
                this._nextPage = this._currentPage + 1;
            }

            itemsElement.prepend(pageHeader);

            if (isCommentLink) {
                var linkedComment = $("#" + SGPP.location.hash);

                $(window).scrollTop(linkedComment.position().top);
            }

            $(window).scroll((event) => {
                var scrollPos = $(window).scrollTop() + $(window).height();

                if (scrollPos > $('div.pagination').position().top - 200) {
                    this.loadNextPage();
                }
            });

            // Ensure second page, when page fits the screen
            $(window).scroll();
        }

    }

}