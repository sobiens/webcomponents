<%@ Page Language="C#" Title="Grid API Documentation" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Grid.aspx.cs" Inherits="Sobiens.Web.Components.API_Documentation.Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>


<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <script src="scripts/prettify/prettify.js"> </script>
    <script src="scripts/prettify/lang-css.js"> </script>
    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link type="text/css" rel="stylesheet" href="styles/prettify-tomorrow.css">
    <link type="text/css" rel="stylesheet" href="styles/jsdoc-default.css">
    <hgroup class="title">
        <h1><%: Title %></h1>
    </hgroup>
    <div class="soby-apidocumentation">
        <div id="main">

            <h1 class="page-title">Class: soby_WebGrid</h1>






            <section>

                <header>

                    <h2>soby_WebGrid</h2>


                </header>

                <article>
                    <div class="container-overview">





                        <h4 class="name" id="soby_WebGrid"><span class="type-signature"></span>new soby_WebGrid<span class="signature">(contentDivSelector, title, dataService, emptyDataHtml)</span><span class="type-signature"></span></h4>





                        <div class="description">
                            Represents a webgrid.
                        </div>









                        <h5>Parameters:</h5>


                        <table class="params">
                            <thead>
                                <tr>

                                    <th>Name</th>


                                    <th>Type</th>





                                    <th class="last">Description</th>
                                </tr>
                            </thead>

                            <tbody>


                                <tr>

                                    <td class="name"><code>contentDivSelector</code></td>


                                    <td class="type">


                                        <span class="param-type">string</span>



                                    </td>





                                    <td class="description last">The author of the book.</td>
                                </tr>



                                <tr>

                                    <td class="name"><code>title</code></td>


                                    <td class="type">


                                        <span class="param-type">string</span>



                                    </td>





                                    <td class="description last">The title of the grid.</td>
                                </tr>



                                <tr>

                                    <td class="name"><code>dataService</code></td>


                                    <td class="type">


                                        <span class="param-type">string</span>



                                    </td>





                                    <td class="description last">The dataservice of the grid.</td>
                                </tr>



                                <tr>

                                    <td class="name"><code>emptyDataHtml</code></td>


                                    <td class="type">


                                        <span class="param-type">string</span>



                                    </td>





                                    <td class="description last">Html content which will be displayed if there is no record.</td>
                                </tr>


                            </tbody>
                        </table>






                        <dl class="details">


























                            <dt class="tag-source">Source:</dt>
                            <dd class="tag-source">
                                <ul class="dummy">
                                    <li>
                                        <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line233">line 233</a>
                                    </li>
                                </ul>
                            </dd>







                        </dl>















                        <h5>Example</h5>

                        <pre class="prettyprint"><code>// Creates the grid object
var bookDataSourceBuilder = new soby_WSBuilder();
bookDataSourceBuilder.Filters = new SobyFilters(false);
bookDataSourceBuilder.AddSchemaField("Id", SobyFieldTypes.Number, null);
bookDataSourceBuilder.AddSchemaField("Title", SobyFieldTypes.Text, null);
bookDataSourceBuilder.AddSchemaField("Year", SobyFieldTypes.Number, null);
bookDataSourceBuilder.AddSchemaField("Price", SobyFieldTypes.Number, null);
bookDataSourceBuilder.AddSchemaField("Genre", SobyFieldTypes.Text, null);
bookDataSourceBuilder.AddSchemaField("AuthorId", SobyFieldTypes.Lookup, { ModelName: "Author", ValueFieldType: SobyFieldTypes.Number, ValueFieldName: "Id", TitleFieldName: "Name", ReadTransport: new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Authors", "json", "application/json; charset=utf-8", "GET")});
var bookService = new soby_WebServiceService(bookDataSourceBuilder);
bookService.Transport.Read = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "GET");
bookService.Transport.Add = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books", "json", "application/json; charset=utf-8", "POST");
bookService.Transport.Update = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "PUT");
bookService.Transport.Delete = new soby_TransportRequest(soby_GetTutorialWebAPIUrl() + "/Books(#key)", "json", "application/json; charset=utf-8", "DELETE");
var bookGrid = new soby_WebGrid("#soby_BooksDiv", "Books", bookService, "There is no record found.");
bookGrid.ImagesFolderUrl = "/Images";
bookGrid.AddKeyField("Id");
bookGrid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null);
bookGrid.AddColumn("Year", "Year", SobyShowFieldsOn.All, null, null, true, true, true, null);
bookGrid.AddColumn("Price", "Price", SobyShowFieldsOn.All, null, null, true, true, true, null);
bookGrid.AddColumn("Genre", "Genre", SobyShowFieldsOn.All, null, null, true, true, true, null);
bookGrid.AddColumn("AuthorId", "Author", SobyShowFieldsOn.All, function (item) {
   return item.Author.Name;
}, null, true, true, true, null);
bookGrid.Initialize(true);</code></pre>




                    </div>












                    <h3 class="subsection-title">Members</h3>



                    <h4 class="name" id="ActionInProgress"><span class="type-signature"></span>ActionInProgress<span class="type-signature"></span></h4>










                    <h5 class="subsection-title">Properties:</h5>



                    <table class="props">
                        <thead>
                            <tr>

                                <th>Name</th>


                                <th>Type</th>





                                <th class="last">Description</th>
                            </tr>
                        </thead>

                        <tbody>


                            <tr>

                                <td class="name"><code>ActionInProgress</code></td>


                                <td class="type">


                                    <span class="param-type">boolean</span>



                                </td>





                                <td class="description last">States whether an action is in progress or not.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>Active</code></td>


                                <td class="type">


                                    <span class="param-type">boolean</span>



                                </td>





                                <td class="description last">States whether the grid is active or not.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>CellCount</code></td>


                                <td class="type">


                                    <span class="param-type">number</span>



                                </td>





                                <td class="description last">Total cell count.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>Columns</code></td>


                                <td class="type">


                                    <span class="param-type">Array</span>



                                </td>





                                <td class="description last">Columns of the grid.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>ContentDivSelector</code></td>


                                <td class="type">


                                    <span class="param-type">string</span>



                                </td>





                                <td class="description last">Jquery selector sring for the grid main container.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>DataRelations</code></td>


                                <td class="type">


                                    <span class="param-type">Array</span>



                                </td>





                                <td class="description last">Relations with other grids.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>DataService</code></td>


                                <td class="type">


                                    <span class="param-type">soby_ServiceInterface</span>



                                </td>





                                <td class="description last">The service to provide data to the grid.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>DisplayTitle</code></td>


                                <td class="type">


                                    <span class="param-type">boolean</span>



                                </td>





                                <td class="description last">States whether it should display the title or not.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>EmptyDataHtml</code></td>


                                <td class="type">


                                    <span class="param-type">string</span>



                                </td>





                                <td class="description last">The html content which will be displayed when there is no record in the grid result.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>Filters</code></td>


                                <td class="type">


                                    <span class="param-type">SobyFilters</span>



                                </td>





                                <td class="description last">Filters of the grid.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>FilterControls</code></td>


                                <td class="type">


                                    <span class="param-type">Array</span>



                                </td>





                                <td class="description last">Controls for filter fields.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>GridID</code></td>


                                <td class="type">


                                    <span class="param-type">string</span>



                                </td>





                                <td class="description last">ID string of the grid.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>GroupByFields</code></td>


                                <td class="type">


                                    <span class="param-type">SobyGroupByFields</span>



                                </td>





                                <td class="description last">Group by fields.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>ImagesFolderUrl</code></td>


                                <td class="type">


                                    <span class="param-type">string</span>



                                </td>





                                <td class="description last">Url of the grid images folder.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>IsSelectable</code></td>


                                <td class="type">


                                    <span class="param-type">boolean</span>



                                </td>





                                <td class="description last">States whether rows should be selectable or not.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>IsEditable</code></td>


                                <td class="type">


                                    <span class="param-type">boolean</span>



                                </td>





                                <td class="description last">States whether rows should be editable or not.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>IsGroupable</code></td>


                                <td class="type">


                                    <span class="param-type">boolean</span>



                                </td>





                                <td class="description last">States whether fields should be groupable or not.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>ItemDialogClientID</code></td>


                                <td class="type">


                                    <span class="param-type">string</span>



                                </td>





                                <td class="description last">Client id of the item (edit/new) dialog.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>Items</code></td>


                                <td class="type">


                                    <span class="param-type">Array</span>



                                </td>





                                <td class="description last">Populated items of the grid.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>KeyFields</code></td>


                                <td class="type">


                                    <span class="param-type">Array.&lt;string></span>



                                </td>





                                <td class="description last">Key fields.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>OrderByFields</code></td>


                                <td class="type">


                                    <span class="param-type">SobyOrderByFields</span>



                                </td>





                                <td class="description last">Order by fields.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>PageIndex</code></td>


                                <td class="type">


                                    <span class="param-type">number</span>



                                </td>





                                <td class="description last">Index of the current page.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>ShowHeader</code></td>


                                <td class="type">


                                    <span class="param-type">boolean</span>



                                </td>





                                <td class="description last">States whether headers should be visible or not.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>Title</code></td>


                                <td class="type">


                                    <span class="param-type">string</span>



                                </td>





                                <td class="description last">Title of the grid.</td>
                            </tr>


                        </tbody>
                    </table>




                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line261">line 261</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>










                    <h3 class="subsection-title">Methods</h3>






                    <h4 class="name" id="Activate"><span class="type-signature"></span>Activate<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Activates the grid.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line575">line 575</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Activates the grid
grid.Activate();</code></pre>








                    <h4 class="name" id="AddColumn"><span class="type-signature"></span>AddColumn<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Adds a column
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line621">line 621</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Adds Title as a column
grid.AddColumn("Title", "Title", SobyShowFieldsOn.All, null, null, true, true, true, null);</code></pre>








                    <h4 class="name" id="AddDataRelation"><span class="type-signature"></span>AddDataRelation<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Adds a data relation
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line635">line 635</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Adds a data relation on Id field with AuthorId on detail grid
authorGrid.AddDataRelation("Title", "Id", authorBooksGrid.GridID, "AuthorId");</code></pre>








                    <h4 class="name" id="AddFilterControl"><span class="type-signature"></span>AddFilterControl<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Not implemented yet.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line602">line 602</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="AddHeaderCell"><span class="type-signature"></span>AddHeaderCell<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Adds a header cell
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1152">line 1152</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="AddKeyField"><span class="type-signature"></span>AddKeyField<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Adds key field.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line596">line 596</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Adds ID as key field
grid.AddKeyField("ID");</code></pre>








                    <h4 class="name" id="AllowDropColumn"><span class="type-signature"></span>AllowDropColumn<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Allows drop column
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line821">line 821</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="ApplyFilters"><span class="type-signature"></span>ApplyFilters<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Apply filters
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1372">line 1372</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Apply filters
grid.ApplyFilters('Title');</code></pre>








                    <h4 class="name" id="ClearFiltersOn"><span class="type-signature"></span>ClearFiltersOn<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Clear filters on given field name
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1043">line 1043</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Clear filters on given field name
grid.ClearFiltersOn('Title')</code></pre>








                    <h4 class="name" id="DeActivate"><span class="type-signature"></span>DeActivate<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        De-activates the grid.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line585">line 585</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// De-Activates the grid
grid.Activate();</code></pre>








                    <h4 class="name" id="DeleteSelectedRows"><span class="type-signature"></span>DeleteSelectedRows<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Deletes selected rows.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line517">line 517</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Deletes selected rows
grid.DeleteSelectedRows();</code></pre>








                    <h4 class="name" id="DragColumn"><span class="type-signature"></span>DragColumn<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Drags column via setting its field name
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line830">line 830</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="DropColumn"><span class="type-signature"></span>DropColumn<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Drops the column
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line838">line 838</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="DropGroupByColumn"><span class="type-signature"></span>DropGroupByColumn<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Drops group by column
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line848">line 848</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="EditCell"><span class="type-signature"></span>EditCell<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Not implemented yet.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line561">line 561</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="EditNewRow"><span class="type-signature"></span>EditNewRow<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Edits new row.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line465">line 465</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Edits new row.
grid.EditNewRow();</code></pre>








                    <h4 class="name" id="EditOffCell"><span class="type-signature"></span>EditOffCell<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Not implemented yet.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line550">line 550</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="EditOffOnEditedCells"><span class="type-signature"></span>EditOffOnEditedCells<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Not implemented yet.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line532">line 532</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="EditSelectedCell"><span class="type-signature"></span>EditSelectedCell<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Not implemented yet.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line542">line 542</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="EditSelectedRow"><span class="type-signature"></span>EditSelectedRow<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Edits selected row.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line452">line 452</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Edits selected row.
grid.EditSelectedRow();</code></pre>








                    <h4 class="name" id="EnsureGridExistency"><span class="type-signature"></span>EnsureGridExistency<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Ensures grid is in the global grid array.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line337">line 337</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Ensures grid is in the global grid array.
grid.EnsureGridExistency();</code></pre>








                    <h4 class="name" id="EnsureItemDialogContainer"><span class="type-signature"></span>EnsureItemDialogContainer<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Ensures edit/new item form dialog exists in the body.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line371">line 371</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Ensures edit/new item form dialog exists in the body.
grid.EnsureItemDialogContainer(1, 'Title');</code></pre>








                    <h4 class="name" id="FilterResult"><span class="type-signature"></span>FilterResult<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Filters result based on given field name with single value
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1065">line 1065</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Filters the result with the given value
grid.FilterResult('Title', 'Moby', SobyFieldTypes.Text, SobyFilterTypes.Contains)</code></pre>








                    <h4 class="name" id="FilterResultWithMultipleValues"><span class="type-signature"></span>FilterResultWithMultipleValues<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Filters result based on given field name with multiple value
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1083">line 1083</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Filters the result with the given values
grid.FilterResultWithMultipleValues('Title', ['Moby', 'Don'], SobyFieldTypes.Text, SobyFilterTypes.Contains)</code></pre>








                    <h4 class="name" id="GenerateActionPane"><span class="type-signature"></span>GenerateActionPane<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Generates action pane
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line908">line 908</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Generates action pane
grid.GenerateActionPane();</code></pre>








                    <h4 class="name" id="GenerateFilterPane"><span class="type-signature"></span>GenerateFilterPane<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Generates filter pane
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line791">line 791</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Generates filter pane
grid.GenerateFilterPane();</code></pre>








                    <h4 class="name" id="GenerateGroupByPanePane"><span class="type-signature"></span>GenerateGroupByPanePane<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Generates group by pane
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line865">line 865</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Generates filter pane
grid.GenerateGroupByPanePane();</code></pre>








                    <h4 class="name" id="GenerateNavigationPane"><span class="type-signature"></span>GenerateNavigationPane<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Generates navigation pane
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line932">line 932</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Generates navigation pane
grid.GenerateNavigationPane();</code></pre>








                    <h4 class="name" id="GetActiveRowID"><span class="type-signature"></span>GetActiveRowID<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Gets active row identifier
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line670">line 670</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
grid.GetActiveRowID()</code></pre>








                    <h4 class="name" id="GetItemFieldValue"><span class="type-signature"></span>GetItemFieldValue<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Get the value of the given rowindex and fieldname.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line353">line 353</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Returns the value of Title field which is in row with index number 1.
grid.GetItemFieldValue(1, 'Title');</code></pre>








                    <h4 class="name" id="GetRowIds"><span class="type-signature"></span>GetRowIds<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Gets row identifiers
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line644">line 644</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// returns ["soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec", "soby_griddatarow_f0b7f7e8-6b89-accf-0446-88eda73e0bee"]
grid.GetRowIds()</code></pre>








                    <h4 class="name" id="GetSelectedCellID"><span class="type-signature"></span>GetSelectedCellID<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Gets selected cell identifier
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line682">line 682</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// returns "soby_gridcell_8be81bcb-ae80-5309-3d8a-6ad091c01051"
grid.GetSelectedCellID();</code></pre>








                    <h4 class="name" id="GetSelectedDataItems"><span class="type-signature"></span>GetSelectedDataItems<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Gets selected data items
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line708">line 708</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// returns [Object, Object]
grid.GetSelectedDataItems();</code></pre>








                    <h4 class="name" id="GetSelectedRowID"><span class="type-signature"></span>GetSelectedRowID<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Gets selected row identifier
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line658">line 658</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// returns "soby_griddatarow_bbe4e9e8-6e44-aca8-0129-15fc255df0ec"
grid.GetSelectedRowID()</code></pre>








                    <h4 class="name" id="GetSelectedRowIDs"><span class="type-signature"></span>GetSelectedRowIDs<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Gets selected row identifiers
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line694">line 694</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// returns ["soby_griddatarow_fa5a2dd6-fc2a-d61b-5b9f-4e6e0824ce11", "soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c"]
grid.GetSelectedRowIDs();</code></pre>








                    <h4 class="name" id="GoToNextPage"><span class="type-signature"></span>GoToNextPage<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Navigates to the next page
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line948">line 948</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Navigates to the next page
grid.GoToNextPage();</code></pre>








                    <h4 class="name" id="GoToPreviousPage"><span class="type-signature"></span>GoToPreviousPage<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Navigates to the previous page
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line958">line 958</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Navigates to the previous page
grid.GoToPreviousPage();</code></pre>








                    <h4 class="name" id="GroupBy"><span class="type-signature"></span>GroupBy<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Groups result based on given field name
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1133">line 1133</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Group by Title field as ascending
grid.GroupBy('Title', true)</code></pre>








                    <h4 class="name" id="HideCellPopupContent"><span class="type-signature"></span>HideCellPopupContent<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Hides cell poup content
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1032">line 1032</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Hides cell poup content
grid.HideCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')</code></pre>








                    <h4 class="name" id="HideHeaderRowMenu"><span class="type-signature"></span>HideHeaderRowMenu<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Hides header row menu
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1275">line 1275</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Hides header row menu icon
grid.HideHeaderRowMenu('Title');</code></pre>








                    <h4 class="name" id="HideHeaderRowMenuIcon"><span class="type-signature"></span>HideHeaderRowMenuIcon<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Hides header row menu icon
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1264">line 1264</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Hides header row menu icon
grid.HideHeaderRowMenuIcon('Title');</code></pre>








                    <h4 class="name" id="HideItemDialog"><span class="type-signature"></span>HideItemDialog<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Hides edit/new item form dialog.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line362">line 362</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Hides edit/new item form dialog.
grid.HideItemDialog();</code></pre>








                    <h4 class="name" id="HideShowFilterPane"><span class="type-signature"></span>HideShowFilterPane<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Hides/show filter pane
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line773">line 773</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Hides/show filter pane
grid.HideShowFilterPane();</code></pre>








                    <h4 class="name" id="Initialize"><span class="type-signature"></span>Initialize<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Initializes the grid
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1414">line 1414</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Initializes the grid and populate items
grid.Initialize(true);</code></pre>








                    <h4 class="name" id="PopulateDetailGrid"><span class="type-signature"></span>PopulateDetailGrid<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Populates the detail grid
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line974">line 974</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Populates the detail grid
grid.PopulateDetailGrid('soby_grid_fc073155-7f8d-094a-4745-55acd12c4812','#soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0_soby_grid_fc073155-7f8d-094a-4745-55acd12c4812', 'soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0', 'AuthorId', '1');</code></pre>








                    <h4 class="name" id="PopulateEditControlsOnNewEditForm"><span class="type-signature"></span>PopulateEditControlsOnNewEditForm<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Populate edit controls for edit/new item form.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line395">line 395</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Examples</h5>

                    <pre class="prettyprint"><code>// Populates new item form
grid.PopulateEditControlsOnNewEditForm(false, null);</code></pre>

                    <pre class="prettyprint"><code>// Populates edit item form for row id as soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b
grid.PopulateEditControlsOnNewEditForm(true, 'soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b');</code></pre>








                    <h4 class="name" id="PopulateGridData"><span class="type-signature"></span>PopulateGridData<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Populates the grid data
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1484">line 1484</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Populates the grid with the given items
grid.PopulateGridData(items);</code></pre>








                    <h4 class="name" id="PopulateHeaderCells"><span class="type-signature"></span>PopulateHeaderCells<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Populates header cells
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1228">line 1228</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Populates header cells
grid.PopulateHeaderCells()</code></pre>








                    <h4 class="name" id="SaveItemDetail"><span class="type-signature"></span>SaveItemDetail<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Saves currently edited item.
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line476">line 476</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Saves edited item with row id as soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b.
grid.SaveItemDetail('soby_griddatarow_e6d7a5b4-3636-5780-f02e-c84b43ca2c6b');</code></pre>








                    <h4 class="name" id="SelectCell"><span class="type-signature"></span>SelectCell<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Selects the cell
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line758">line 758</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Selects the cell with given row identifier and cell index
grid.SelectCell("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c", 3);</code></pre>








                    <h4 class="name" id="SelectDetailGridTab"><span class="type-signature"></span>SelectDetailGridTab<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Selects the detail grid tab
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1000">line 1000</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Populates the detail grid
grid.SelectDetailGridTab('soby_griddatarow_e63bc6df-9a42-a52e-86a5-3d6665cd0bc0', '0');</code></pre>








                    <h4 class="name" id="SelectRow"><span class="type-signature"></span>SelectRow<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Selects the row
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line725">line 725</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Selects the row with given row identifier
grid.SelectRow("soby_griddatarow_fdc30fcf-caee-eec7-a95f-16589d619c9c");</code></pre>








                    <h4 class="name" id="ShowCellPopupContent"><span class="type-signature"></span>ShowCellPopupContent<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Shows cell poup content
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1017">line 1017</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Shows cell poup content
grid.ShowCellPopupContent('soby_gridcell_2e7e2471-cd48-85ac-45ab-5f2db8162cbc')</code></pre>








                    <h4 class="name" id="ShowHeaderRowMenu"><span class="type-signature"></span>ShowHeaderRowMenu<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Shows header row menu
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1292">line 1292</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Shows header row menu
grid.ShowHeaderRowMenu('Title', 'Title', true, true)</code></pre>








                    <h4 class="name" id="ShowHeaderRowMenuIcon"><span class="type-signature"></span>ShowHeaderRowMenuIcon<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Shows header row menu icon
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1253">line 1253</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Shows header row menu icon
grid.ShowHeaderRowMenuIcon('Title');</code></pre>








                    <h4 class="name" id="SortGroupByField"><span class="type-signature"></span>SortGroupByField<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Sorts result based on given group by field name
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1101">line 1101</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Sorts by Title group field as ascending
grid.SortGroupByField('Title', true)</code></pre>








                    <h4 class="name" id="SortResult"><span class="type-signature"></span>SortResult<span class="signature">()</span><span class="type-signature"></span></h4>





                    <div class="description">
                        Sorts result based on given field name
                    </div>













                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line1118">line 1118</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>















                    <h5>Example</h5>

                    <pre class="prettyprint"><code>// Sorts by Title field as ascending
grid.SortResult('Title', true)</code></pre>









                    <h3 class="subsection-title">Events</h3>






                    <h4 class="name" id="event:ItemCreated">ItemCreated</h4>





                    <div class="description">
                        Item creation event.
                    </div>





                    <h5>Type:</h5>
                    <ul>
                        <li>

                            <span class="param-type">object</span>


                        </li>
                    </ul>









                    <h5 class="subsection-title">Properties:</h5>



                    <table class="props">
                        <thead>
                            <tr>

                                <th>Name</th>


                                <th>Type</th>





                                <th class="last">Description</th>
                            </tr>
                        </thead>

                        <tbody>


                            <tr>

                                <td class="name"><code>rowID</code></td>


                                <td class="type">


                                    <span class="param-type">object</span>



                                </td>





                                <td class="description last">Identifier of the row.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>item</code></td>


                                <td class="type">


                                    <span class="param-type">object</span>



                                </td>





                                <td class="description last">Data item related with the row.</td>
                            </tr>


                        </tbody>
                    </table>




                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line287">line 287</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="event:OnCellSelected">OnCellSelected</h4>





                    <div class="description">
                        Cell selection event.
                    </div>





                    <h5>Type:</h5>
                    <ul>
                        <li>

                            <span class="param-type">object</span>


                        </li>
                    </ul>









                    <h5 class="subsection-title">Properties:</h5>



                    <table class="props">
                        <thead>
                            <tr>

                                <th>Name</th>


                                <th>Type</th>





                                <th class="last">Description</th>
                            </tr>
                        </thead>

                        <tbody>


                            <tr>

                                <td class="name"><code>grid</code></td>


                                <td class="type">


                                    <span class="param-type"><a href="Grid.aspx">soby_WebGrid</a></span>



                                </td>





                                <td class="description last">Current grid object.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>rowID</code></td>


                                <td class="type">


                                    <span class="param-type">object</span>



                                </td>





                                <td class="description last">Identifier of the row.</td>
                            </tr>



                            <tr>

                                <td class="name"><code>cellIndex</code></td>


                                <td class="type">


                                    <span class="param-type">object</span>



                                </td>





                                <td class="description last">Index of the cell.</td>
                            </tr>


                        </tbody>
                    </table>




                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line310">line 310</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="event:OnGridPopulated">OnGridPopulated</h4>





                    <div class="description">
                        Grid population event.
                    </div>





                    <h5>Type:</h5>
                    <ul>
                        <li>

                            <span class="param-type">object</span>


                        </li>
                    </ul>









                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line296">line 296</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>





















                    <h4 class="name" id="event:OnRowSelected">OnRowSelected</h4>





                    <div class="description">
                        Row selection event.
                    </div>





                    <h5>Type:</h5>
                    <ul>
                        <li>

                            <span class="param-type">object</span>


                        </li>
                    </ul>









                    <dl class="details">


























                        <dt class="tag-source">Source:</dt>
                        <dd class="tag-source">
                            <ul class="dummy">
                                <li>
                                    <a href="soby.ui.components.js.html">soby.ui.components.js</a>, <a href="soby.ui.components.js.html#line303">line 303</a>
                                </li>
                            </ul>
                        </dd>







                    </dl>


















                </article>

            </section>




        </div>

        <nav>
            <h2><a href="index.html">Home</a></h2>
            <h3>Classes</h3>
            <ul>
                <li><a href="Grid.aspx">soby_WebGrid</a></li>
            </ul>
            <h3>Events</h3>
            <ul>
                <li><a href="Grid.aspx#event:ItemCreated">ItemCreated</a></li>
                <li><a href="Grid.aspx#event:OnCellSelected">OnCellSelected</a></li>
                <li><a href="Grid.aspx#event:OnGridPopulated">OnGridPopulated</a></li>
                <li><a href="Grid.aspx#event:OnRowSelected">OnRowSelected</a></li>
            </ul>
        </nav>

        <br class="clear">

        <footer>
            Documentation generated by <a href="https://github.com/jsdoc3/jsdoc">JSDoc 3.4.0</a> on Mon Aug 22 2016 17:14:16 GMT+0300 (GTB Summer Time)
        </footer>
    </div>
    <script> prettyPrint(); </script>
    <script src="scripts/linenumber.js"> </script>

</asp:Content>
