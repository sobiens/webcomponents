using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Sobiens.Web.Components.Mvc.SobyGrid
{
    public class SobyGrid
    {
        internal HtmlHelper Helper = null;
        internal string _ID = string.Empty;
        internal string _Width = string.Empty;
        internal string _Height = string.Empty;
        internal string _PrimaryKey = string.Empty;
        
        public Transport _DataSource = null;
        public Columns _Columns = null;
        public SchemaColumns _SchemaColumns = null;

        public SobyGrid() {
            this._DataSource = new Transport();
            this._Columns = new Columns();
            this._SchemaColumns = new SchemaColumns();
        }

        public IHtmlString Render()
        {
            StringBuilder sb = new StringBuilder();
            string gridContainerId = "sobygrid_" + this._ID;
            sb.Append("<link href=\"http://localhost:5519/Css/soby.ui.components.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">");
            sb.Append("<script src=\"http://localhost:5519/Scripts/soby.service.js\"></script>");
            sb.Append("<script src=\"http://localhost:5519/Scripts/soby.ui.components.js\"></script>");

            sb.Append("<div id='" + gridContainerId + "'></div>" + Environment.NewLine);
            sb.Append("<script language='javascript'>" + Environment.NewLine);
            sb.Append("var bookDataSourceBuilder = new soby_WSBuilder();" + Environment.NewLine);
            sb.Append("bookDataSourceBuilder.Filters = new SobyFilters(false);" + Environment.NewLine);
            foreach (SchemaColumn sc in this._SchemaColumns)
            {
                sb.Append("bookDataSourceBuilder.AddSchemaField(\"" + sc.FieldName + "\", SobyFieldTypes." + sc.FieldType.ToString() + ", null);" + Environment.NewLine);
            }

            sb.Append("var bookService = new soby_WebServiceService(bookDataSourceBuilder);" + Environment.NewLine);
            if (this._DataSource.Add != null)
            {
                sb.Append("bookService.Transport.Add = new soby_TransportRequest(\"" + this._DataSource.Add.Url + "\", \"" + this._DataSource.Add.DataType + "\", \"" + this._DataSource.Add.ContentType + "\", \"" + this._DataSource.Add.Type + "\");" + Environment.NewLine);
            }
            if (this._DataSource.Delete != null)
            {
                sb.Append("bookService.Transport.Delete = new soby_TransportRequest(\"" + this._DataSource.Delete.Url + "\", \"" + this._DataSource.Delete.DataType + "\", \"" + this._DataSource.Delete.ContentType + "\", \"" + this._DataSource.Delete.Type + "\");" + Environment.NewLine);
            }
            if (this._DataSource.Read != null)
            {
                sb.Append("bookService.Transport.Read = new soby_TransportRequest(\"" + this._DataSource.Read.Url + "\", \"" + this._DataSource.Read.DataType + "\", \"" + this._DataSource.Read.ContentType + "\", \"" + this._DataSource.Read.Type + "\");" + Environment.NewLine);
            }
            if (this._DataSource.Update != null)
            {
                sb.Append("bookService.Transport.Update = new soby_TransportRequest(\"" + this._DataSource.Update.Url + "\", \"" + this._DataSource.Update.DataType + "\", \"" + this._DataSource.Update.ContentType + "\", \"" + this._DataSource.Update.Type + "\");" + Environment.NewLine);
            }

            sb.Append("var bookGrid = new soby_WebGrid(\"#" + gridContainerId + "\", \"Books\", bookService, \"There is no record found.\");" + Environment.NewLine);
            sb.Append("bookGrid.AddKeyField(\"Id\");" + Environment.NewLine);
            foreach (Column c in this._Columns)
            {
                sb.Append("bookGrid.AddColumn(\"" + c.FieldName + "\", \"" + c.DisplayName + "\", SobyShowFieldsOn." + c.ShowFieldsOn + ", null, null, true, true, true, null);" + Environment.NewLine);
            }


            sb.Append("bookGrid.Initialize(true);" + Environment.NewLine);
            sb.Append("</script>" + Environment.NewLine);

            return Helper.Raw(sb.ToString());
        }

        public SobyGrid ID(string gridID)
        {
            this._ID = gridID;
            return this;
        }

        public SobyGrid Width(string width)
        {
            this._Width = width;
            return this;
        }

        public SobyGrid Height(string height)
        {
            this._Height = height;
            return this;
        }


        public SobyGrid PrimaryKey(string primaryKey)
        {
            this._PrimaryKey = primaryKey;
            return this;
        }

        public SobyGrid DataSource(Action<Transport> lambda)
        {
            lambda(this._DataSource);
            return this;
        }

        public SobyGrid Columns(Action<Columns> lambda)
        {
            lambda(this._Columns);
            return this;
        }

        public SobyGrid SchemaColumns(Action<SchemaColumns> lambda)
        {
            lambda(this._SchemaColumns);
            return this;
        }
    }
}
