/**
 * Interface for the AJAX setting that will configure the AJAX request
 */
interface Function {
    /**
     * The content type sent in the request header that tells the server what kind of response it will accept in return. If the accepts setting needs modification, it is recommended to do so once in the $.ajaxSetup() method.
     */
    createDelegate?: any;
}

interface SP
{
    /**
     * The content type sent in the request header that tells the server what kind of response it will accept in return. If the accepts setting needs modification, it is recommended to do so once in the $.ajaxSetup() method.
     */
    ClientContext?: any;
    CamlQuery?: any;
}

declare var SP: SP; 