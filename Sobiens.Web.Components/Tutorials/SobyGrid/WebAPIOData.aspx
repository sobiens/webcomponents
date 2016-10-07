<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="WebAPIOData.aspx.cs" Inherits="Sobiens.Web.Components.Tutorials.SobyGrid.WebAPIOData" Title="Grid" %>

<%@ Register Src="~/Controls/SobyGridSideMenuControl.ascx" TagPrefix="uc1" TagName="SobyGridSideMenuControl" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
    <hgroup class="title">
        <h1><%: Title %></h1>
        <br />
        <h2>Web API and OData Implementation</h2>
    </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <p>This example demonstrates how to use Web API and OData in the Soby Data Grid. <br />
        <img src="/Images/Tutorials/Soby_WebGrid_WebAPIOData_TaskApplication.png" />
        <ul>
            <li>So we will start with creating a project. Navigate to <strong>File >> New >> Project</strong>.</li>
            <li>Select <strong>"ASP.NET Web Application"</strong> as shown.<br />
                <img src="/Images/Tutorials/Soby_WebGrid_WebAPIOData_CreateProjectStep1.png" width="800px" /><br /><br />
            </li>
            <li>Select <strong>"Web API"</strong> template as shown.
                <img src="/Images/Tutorials/Soby_WebGrid_WebAPIOData_CreateProjectStep2.png" width="800px" />
            </li>
                        <li>Navigate to <strong>Tools >> Library Package Manager</strong>, then select <strong>Package Manager Console</strong>. Use the following command in the Package Manager Console.
                <br />
                        <pre class="js">Install-Package Microsoft.AspNet.Odata
Install-Package EntityFramework</pre><br />
                            These commands will install OData and EntityFramework packages
</li>
            <li>Create the following classes under the Models folder
                <br /><strong>Priority.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('PriorityViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/Priority.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="PriorityViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                <br /><strong>Category.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('CategoryViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/Category.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="CategoryViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                <br /><strong>Status.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('StatusViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/Status.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="StatusViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                <br /><strong>Task.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('TaskViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/Task.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="TaskViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                <br /><strong>TaskServiceContext.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('TaskServiceContextViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/TaskServiceContext.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="TaskServiceContextViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
            </li>
                        <li>Create the following classes under the Controllers folder
                <br /><strong>CategoriesController.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('CategoriesControllerViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/CategoriesController.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="CategoriesControllerViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                <br /><strong>PrioritiesController.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('PrioritiesControllerViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/PrioritiesController.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="PrioritiesControllerViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                <br /><strong>StatusesController.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('StatusesControllerViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/StatusesController.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="StatusesControllerViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                <br /><strong>TasksController.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('TasksControllerViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/TasksController.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="TasksControllerViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                            </li>
                        <li>Modify the following classes under the App_Start folder
                <br /><strong>WebApiConfig.cs</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('WebApiConfigViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/WebApiConfig.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="WebApiConfigViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
                            </li>

                        <li>Place the following syntax into web.config
                        <pre class="xml">  &lt;connectionStrings&gt;
    &lt;add name="TaskServiceContext" connectionString="Data Source=(localdb)\v11.0; Initial Catalog=TaskServiceContext-20160919093018; Integrated Security=True; MultipleActiveResultSets=True; AttachDbFilename=|DataDirectory|TaskServiceContext-20160919093016.mdf" providerName="System.Data.SqlClient" /&gt;
  &lt;/connectionStrings&gt;
</pre>
                            </li>

                        <li>Navigate to <strong>Tools >> Library Package Manager</strong>, then select <strong>Package Manager Console</strong>. Use the following command in the Package Manager Console.
                <br />
                        <pre class="js">Enable-Migrations</pre><br />
                            This command will create "Migrations" folder and Configuration.cs class
                <br /><img src="/Images/Tutorials/Soby_WebGrid_WebAPIOData_EnableMigrations.png" width="800px" />
</li>
                        <li>Modify the Configuration.cs file under Migrations folder with the following code
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('ConfigurationViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/Configuration.cs.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="ConfigurationViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
</li>
                        <li>Use the following commands in the Package Manager Console. This will create a database in the LocalDB and the add the data we have entered in the Seed method in Configuration.cs
                <br />
                        <pre class="js">Add-Migration Initial
Update-Database</pre><br />
                <img src="/Images/Tutorials/Soby_WebGrid_WebAPIOData_MigrationCommand.png" width="800px" />
</li>
            <li>Create the following html file under the root folder
                <br /><strong>TaskManagement.html</strong>
                <a href="javascript:void(0)" onclick="soby_ShowHideViewCode('TaskManagementViewSourceDiv', '/Tutorials/SobyGrid/WebAPIODataCodeFiles/TaskManagement.html.txt')"><img src="/Images/viewsource.png" border="0" width="20px" /> View code</a>
                <pre id="TaskManagementViewSourceDiv" class="viewsource html" style="display:none;background-color:ivory"><div class="viewsourcecodefileoutput"></div></pre>
            </li>
            <li>Download the latest version of <a href="http://webcomponents.sobiens.com/download/Versions">Sobiens Web Components</a>. Create a folder called "media" in the root folder than copy the files into media folder you created.
                <br />
                <img src="/Images/Tutorials/Soby_WebGrid_WebAPIOData_CreateSobyWebComponentsFolder.png" />
            </li>
            <li>You can now hit F5 to run and play with your Task Management web application.</li>
        </ul>

    <br />Want to learn more about the grid component? Check out the <a href="/API Documentation/Grid/Grid.aspx">API documentation</a>.

    <aside>
        <uc1:SobyGridSideMenuControl runat="server" ID="SobyGridSideMenuControl" />
    </aside>
</asp:Content>
