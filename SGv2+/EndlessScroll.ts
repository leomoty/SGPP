/// <reference path="moduledefinition.ts" /> 

module ModuleDefinition {

    export class EndlessScroll {

        private _currentPage: number = -1;
        private _lastPage: number = -1;
        private _numberOfPages: number = -1;
        private _isLoading: boolean = false;
        private _stopped: boolean = false;

        get currentPage():number {
            return this._currentPage;
        }

        get lastPage(): number {
            return this._numberOfPages;
        }

        canHandle(): boolean {
            return false;
        }

        getTest(): boolean {
            return true;
        }

        addStop(el): void {
            // TODO
        }

        createLoadingElement(): any {
            var el = $('<div class="table__heading loading_es"><div class="table__column--width-fill"><p><i class="fa fa-refresh fa-spin"></i> Loading next page...</p></div></div>');
            this.addStop($(el).find('.loading_es p'));

            return el;
        }

        addLastPageElement(): void {
        }

        addLoadingElement(): void {
        }

        removeLoadingElement(): void {
        }

        loadNextPage(): void {
            if (this._isLoading || this._stopped) {
                return;
            }

            this._isLoading = true;
            this._currentPage++;
            
            if (this._currentPage > this._lastPage) {
                this.addLastPageElement();
                return;
            }
            
            this.addLoadingElement();

            var url = $('a[data-page-number=' + this._currentPage + ']').first().attr('href');
            var m = this;

            $.get(url, function (data) {

                var dom = $.parseHTML(data);

                m.parsePage(dom);

                m._isLoading = false;

                m._lastPage = Math.max(m._lastPage, parseInt($('.pagination__navigation a').last().data('page-number')));

                m.removeLoadingElement();
            });
        }

        parsePage(dom): void {
        }

        render(): void {
            // Check that current page can be handled and navigation exists in page 
            if (!this.canHandle() || $('div.pagination__navigation a.is-selected').length == 0)
                return;

            var elLastPage = $('.pagination__navigation a').last();

            this._currentPage = parseInt($('div.pagination__navigation a.is-selected').data('page-number'));

            this._lastPage = parseInt(elLastPage.data('page-number'));

            if (elLastPage.text() == "Last ") {
                this._numberOfPages = this._lastPage;
            }

            if (this._currentPage != 1) {
                return;
            }

            var m = this;

            $(window).scroll(function (event) {
                var scrollPos = $(window).scrollTop() + $(window).height();

                if (scrollPos > $('div.pagination').position().top) {
                    m.loadNextPage();
                }
            });
        }

    }

} 