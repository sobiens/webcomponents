<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="KeyboardNavigation.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.KeyboardNavigation" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %>.</h1>
        <h2>Your app description page.</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">


    <article>
        <script src="../../Scripts/soby.spservice.js"></script>
        <script src="../../Scripts/soby.ui.components.js"></script>
        <script src="../../Scripts/Tutorials/WebAPI/soby.customers.js"></script>

        <ul>
            <li>Left Arrow key is pressed - Selects the left cell, when the Grid is not in edit mode. Otherwise, the key stroke is handled by the editor.
            </li>
            <li>Right Arrow key is pressed - Selects the right cell, when the Grid is not in edit mode. Otherwise, the key stroke is handled by the editor.
            </li>
            <li>Up Arrow key is pressed - Selects the cell above, when the Grid is not in edit mode. Otherwise, the key stroke is handled by the editor.
            </li>
            <li>Down Arrow key is pressed - Selects the cell below, when the Grid is not in edit mode. Otherwise, the key stroke is handled by the editor.
            </li>
            Page Up/Down is pressed - Navigate Up or Down with one page, when the Grid is not in edit mode. Otherwise, the key stroke is handled by the editor.
            <li></li>
            Home/End is pressed - Navigate to the first or last row, when the Grid is not in edit mode. Otherwise, the key stroke is handled by the editor.
            <li>Enter key is pressed - Moves one cell down in "multiplecellsadvanced" selection mode. If the cell is in edit mode, saves the new value and moves one cell down. In the other selection modes, shows the selected cell's editor. If the cell is in edit mode, hides the cell's editor and saves the new value. The editor's value is equal to the cell's value.
            </li>
            <li>Esc key is pressed - Hides the cell's editor and cancels the changes.
            </li>
            <li>Tab key is pressed - Selects the right cell. If the Grid is in edit mode, saves the edit cell's value, closes its editor, selects the right cell and opens its editor.
            </li>
            <li>Shift+Tab keys are pressed - Selects the left cell. If the Grid is in edit mode, saves the edit cell's value, closes its editor, selects the left cell and opens its editor.
            </li>
            <li>F2 key is pressed - shows the selected cell's editor when the Grid is in edit mode.
            </li>
            <li>Space key is pressed - Toggles the checkbox editor's check state when the selected cell's column is a checkbox column and the Grid is editable.
            </li>
            <li>Shift+Arrow key extends the selection.
            </li>
            <li>Shift extends the selection when the user clicks on a cell or row..
            </li>
            <li>Ctrl key is pressed - in 'multiplecellsextended, multiplecellsadvanced and multiplerowsextended' selection mode, extends the selection when the user clicks on a cell or row.
            </li>
            <li>Ctrl+Arrow key - moves to an edge.
            </li>
            <li>Ctrl+C Copy.
            </li>
            <li>Ctrl+X Cut.
            </li>
            <li>Ctrl+V Paste.
            </li>
            <li>Page Down - Moves one screen down
            </li>
            <li>Page Up - Moves one screen up
            </li>
            <li>Home - Moves to the beginning
            </li>
            <li>End - Moves to the end
            </li>
            <li>Typing in a cell when the Grid is "editable" will put the cell in edit mode.
            </li>
        </ul>
    </article>

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
