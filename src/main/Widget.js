/**
 * A Widget is a
 */
export default
class Widget {

    /**
     * Creates a new Widget
     * @param [element], optional define the content of widget
     */
    constructor(element) {
        if (element) {
            this.element = element instanceof HTMLElement ? element : global.document.getElementById(element);
            if (this.element) {
                this.element.hfWidgetInstance = this;
            } else {
                throw 'Could not found element with ID: ' + element;
            }
        }
        /**
         *
         * @type {Promise}
         */
        this.asyncContent = null;

        /**
         * The final resulted content that a widget did create (e.g. a modal container)
         * @type {HTMLElement}
         */
        this.finalContent = null;
    }

    /**
     *
     * @returns {Promise}
     */
    getAsync() {
        return this.asyncContent();
    }

    /**
     * @param {Promise} async
     * @returns {Widget}
     */
    setAsync(async) {
        this.asyncContent = async;
        return this;
    }

    /**
     * @returns {HTMLElement}
     */
    getFinalContent() {
        return this.finalContent;
    }

    /**
     * Destroys the generated content of this widget
     * @returns {boolean}
     */
    destroy() {

        if (this.finalContent && this.finalContent.parentNode) {
            this.finalContent.parentNode.removeChild(this.finalContent);
            return true;
        }

        delete this.element;
        delete this.asyncContent;
        delete this.finalContent;

        return false;
    }

}