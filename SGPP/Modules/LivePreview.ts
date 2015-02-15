/// <reference path="../ModuleDefinition.ts" />
/// <reference path="../Scripts/pagedown/MarkdownConverter.d.ts" />

module ModuleDefinition{

    //var markdownConverter = new Markdown.Converter();

    export class LivePreview implements SteamGiftsModule {

        style = "";

        init(): void {
      /*      $('.comment__description textarea').on("keyup", function () {
                if (!$(this).val().length)
                    $(this).siblings('.preview').remove();
                else if (!$(this).parents('.comment__description').find('.livepreview').length) {
                    $(this).parents('.comment__description form').append('<div class="preview"><div class="preview_text">Live Preview</div><div class="livepreview markdown"></div></div>');
                }
                $(this).siblings('.preview').children('.livepreview').html(markdownConverter.makeHtml($(this).val()));
            });*/
        }

        render(): void {
        }

        name(): string {
            return "LivePreview";
        }

        shouldRun = (location: SGLocation) => false;
    }

}