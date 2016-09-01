namespace Sobiens.Web.Components.TutorialServices.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Town = c.String(),
                        PostCode = c.String(),
                        Address1 = c.String(),
                        CustomerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customers", t => t.CustomerId, cascadeDelete: true)
                .Index(t => t.CustomerId);
            
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(),
                        Sex = c.String(),
                        Age = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Authors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Books",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Year = c.Int(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Genre = c.String(),
                        ImageUrl = c.String(),
                        WebSiteUrl = c.String(),
                        AuthorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Authors", t => t.AuthorId, cascadeDelete: true)
                .Index(t => t.AuthorId);
            
            CreateTable(
                "dbo.Phones",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PhoneType = c.String(),
                        Number = c.String(nullable: false),
                        CustomerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customers", t => t.CustomerId, cascadeDelete: true)
                .Index(t => t.CustomerId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Phones", "CustomerId", "dbo.Customers");
            DropForeignKey("dbo.Books", "AuthorId", "dbo.Authors");
            DropForeignKey("dbo.Addresses", "CustomerId", "dbo.Customers");
            DropIndex("dbo.Phones", new[] { "CustomerId" });
            DropIndex("dbo.Books", new[] { "AuthorId" });
            DropIndex("dbo.Addresses", new[] { "CustomerId" });
            DropTable("dbo.Phones");
            DropTable("dbo.Books");
            DropTable("dbo.Authors");
            DropTable("dbo.Customers");
            DropTable("dbo.Addresses");
        }
    }
}
