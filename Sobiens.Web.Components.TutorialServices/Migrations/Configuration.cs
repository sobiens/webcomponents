namespace Sobiens.Web.Components.TutorialServices.Migrations
{
    using Sobiens.Web.Components.TutorialServices.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Sobiens.Web.Components.TutorialServices.Models.BookServiceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Sobiens.Web.Components.TutorialServices.Models.BookServiceContext context)
        {
            context.Authors.AddOrUpdate(x => x.Id,
                new Author() { Id = 1, Name = "Jane Austen" },
                new Author() { Id = 2, Name = "Charles Dickens" },
                new Author() { Id = 3, Name = "Miguel de Cervantes" },
                new Author() { Id = 4, Name = "Elizabeth Hardwick" },
                new Author() { Id = 5, Name = "Daniel Defoe" },
                new Author() { Id = 6, Name = "Jonathan Swift" },
                new Author() { Id = 7, Name = "Samuel Richardson" },
                new Author() { Id = 8, Name = "Henry Fielding" },
                new Author() { Id = 9, Name = "Mary Shelley" },
                new Author() { Id = 10, Name = " Thomas Love Peacock " },
                new Author() { Id = 11, Name = "Benjamin Disraeli" },
                new Author() { Id = 12, Name = "Charlotte Brontë" },
                new Author() { Id = 13, Name = "William Thackeray" }
                );

            context.Books.AddOrUpdate(x => x.Id,
                new Book()
                {
                    Id = 1,
                    Title = "Pride and Prejudice",
                    Year = 1813,
                    AuthorId = 1,
                    Price = 9.99M,
                    Genre = "Comedy of manners",
                    ImageUrl = "/Images/Carousel/Pride and Prejudice.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Pride_and_Prejudice"
                },
                new Book()
                {
                    Id = 2,
                    Title = "Northanger Abbey",
                    Year = 1817,
                    AuthorId = 1,
                    Price = 12.95M,
                    Genre = "Gothic parody",
                    ImageUrl = "/Images/Carousel/Northanger Abbey.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Northanger_Abbey"
                },
                new Book()
                {
                    Id = 3,
                    Title = "David Copperfield",
                    Year = 1850,
                    AuthorId = 2,
                    Price = 15,
                    Genre = "Bildungsroman",
                    ImageUrl = "/Images/Carousel/David Copperfield.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/David_Copperfield"
                },
                new Book()
                {
                    Id = 4,
                    Title = "Don Quixote",
                    Year = 1617,
                    AuthorId = 3,
                    Price = 8.95M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Don Quixote.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Don_Quixote"
                },
                new Book()
                {
                    Id = 5,
                    Title = "Moby Dick",
                    Year = 1851,
                    AuthorId = 4,
                    Price = 7.25M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Moby Dick.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Moby-Dick"
                },
                new Book()
                {
                    Id = 6,
                    Title = "Robinson Crusoe",
                    Year = 1719,
                    AuthorId = 5,
                    Price = 12.5M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Robinson Crusoe.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Robinson_Crusoe"
                },
                new Book()
                {
                    Id = 7,
                    Title = "Gulliver’s Travels",
                    Year = 1726,
                    AuthorId = 6,
                    Price = 21.5M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Gulliver’s Travels.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Gulliver%27s_Travels"
                },
                new Book()
                {
                    Id = 8,
                    Title = "Clarissa",
                    Year = 1748,
                    AuthorId = 7,
                    Price = 4.75M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Clarissa.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Clarissa"
                },
                new Book()
                {
                    Id = 9,
                    Title = "Tom Jones",
                    Year = 1749,
                    AuthorId = 8,
                    Price = 8.80M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Tom Jones.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Tom_Jones"
                },
                new Book()
                {
                    Id = 10,
                    Title = "Frankenstein",
                    Year = 1818,
                    AuthorId = 9,
                    Price = 7.4M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Frankenstein.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Frankenstein"
                },
                new Book()
                {
                    Id = 11,
                    Title = "Nightmare Abbey",
                    Year = 1818,
                    AuthorId = 10,
                    Price = 8.95M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Nightmare Abbey.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Nightmare_Abbey"
                },
                new Book()
                {
                    Id = 12,
                    Title = "Sybil",
                    Year = 1845,
                    AuthorId = 11,
                    Price = 7.2M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Sybil.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Sybil_(novel)"
                },
                new Book()
                {
                    Id = 13,
                    Title = "Jane Eyre",
                    Year = 1847,
                    AuthorId = 12,
                    Price = 9.90M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Jane Eyre.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Jane_Eyre"
                },
                new Book()
                {
                    Id = 14,
                    Title = "Vanity Fair",
                    Year = 1848,
                    AuthorId = 13,
                    Price = 5.0M,
                    Genre = "Picaresque",
                    ImageUrl = "/Images/Carousel/Vanity Fair.jpg",
                    WebSiteUrl = "https://en.wikipedia.org/wiki/Vanity_Fair_(novel)"
                }
                );

            context.Customers.AddOrUpdate(x => x.Id,
                new Customer()
                {
                    Age = 37,
                    FirstName = "Serkant",
                    Id = 101,
                    LastName = "Samurkas",
                    Sex = "M"
                },
                new Customer()
                {
                    Age = 39,
                    FirstName = "Dexter",
                    Id = 102,
                    LastName = "McKenzie",
                    Sex = "M"
                },
                new Customer()
                {
                    Age = 21,
                    FirstName = "Tricia",
                    Id = 103,
                    LastName = "Cooper",
                    Sex = "F"
                },
                new Customer()
                {
                    Age = 39,
                    FirstName = "Debra",
                    Id = 104,
                    LastName = "Drinian",
                    Sex = "F"
                },
                new Customer()
                {
                    Age = 24,
                    FirstName = "Alex",
                    Id = 105,
                    LastName = "Long",
                    Sex = "M"
                },
                new Customer()
                {
                    Age = 26,
                    FirstName = "Michele",
                    Id = 106,
                    LastName = "Kane",
                    Sex = "F"
                }
            );

            context.Addresses.AddOrUpdate(x => x.Id,
            new Address()
            {
                CustomerId = 101,
                Id = 29,
                Title = "Home",
                Town = "Beckenham",
                PostCode = "BR1 5GE",
                Address1 = "43A High street"
            },
            new Address()
            {
                CustomerId = 102,
                Id = 27,
                Title = "Office",
                Town = "Canada Water",
                PostCode = "CN1 4ET",
                Address1 = "6C High street"
            }
            );

            context.Phones.AddOrUpdate(x => x.Id,
            new Phone()
            {
                CustomerId = 101,
                Id = 25,
                Number = "07776214325",
                PhoneType = "Mobile"
            },
            new Phone()
            {
                CustomerId = 102,
                Id = 26,
                Number = "07777854982",
                PhoneType = "Home"
            }
            );

            context.Products.AddOrUpdate(x => x.Id,
            new Product()
            {
                Id = 1,
                Title = "Pride and Prejudice",
                Price = 9.99M,
                ImageUrl = "/Images/Carousel/Pride and Prejudice.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Pride_and_Prejudice",
            },
            new Product()
            {
                Id = 2,
                Title = "Northanger Abbey",
                Price = 12.95M,
                ImageUrl = "/Images/Carousel/Northanger Abbey.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Northanger_Abbey"
            },
            new Product()
            {
                Id = 3,
                Title = "David Copperfield",
                Price = 15,
                ImageUrl = "/Images/Carousel/David Copperfield.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/David_Copperfield"
            },
            new Product()
            {
                Id = 4,
                Title = "Don Quixote",
                Price = 8.95M,
                ImageUrl = "/Images/Carousel/Don Quixote.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Don_Quixote"
            },
            new Product()
            {
                Id = 5,
                Title = "Moby Dick",
                Price = 7.25M,
                ImageUrl = "/Images/Carousel/Moby Dick.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Moby-Dick"
            },
            new Product()
            {
                Id = 6,
                Title = "Robinson Crusoe",
                Price = 12.5M,
                ImageUrl = "/Images/Carousel/Robinson Crusoe.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Robinson_Crusoe"
            },
            new Product()
            {
                Id = 7,
                Title = "Gulliver’s Travels",
                Price = 21.5M,
                ImageUrl = "/Images/Carousel/Gulliver’s Travels.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Gulliver%27s_Travels"
            },
            new Product()
            {
                Id = 8,
                Title = "Clarissa",
                Price = 4.75M,
                ImageUrl = "/Images/Carousel/Clarissa.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Clarissa"
            },
            new Product()
            {
                Id = 9,
                Title = "Tom Jones",
                Price = 8.80M,
                ImageUrl = "/Images/Carousel/Tom Jones.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Tom_Jones"
            },
            new Product()
            {
                Id = 10,
                Title = "Frankenstein",
                Price = 7.4M,
                ImageUrl = "/Images/Carousel/Frankenstein.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Frankenstein"
            },
            new Product()
            {
                Id = 11,
                Title = "Nightmare Abbey",
                Price = 8.95M,
                ImageUrl = "/Images/Carousel/Nightmare Abbey.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Nightmare_Abbey"
            },
            new Product()
            {
                Id = 12,
                Title = "Sybil",
                Price = 7.2M,
                ImageUrl = "/Images/Carousel/Sybil.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Sybil_(novel)"
            },
            new Product()
            {
                Id = 13,
                Title = "Jane Eyre",
                Price = 9.90M,
                ImageUrl = "/Images/Carousel/Jane Eyre.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Jane_Eyre"
            },
            new Product()
            {
                Id = 14,
                Title = "Vanity Fair",
                Price = 5.0M,
                ImageUrl = "/Images/Carousel/Vanity Fair.jpg",
                WebSiteUrl = "https://en.wikipedia.org/wiki/Vanity_Fair_(novel)"
            }
            );

            #region Orders
            context.Orders.AddOrUpdate(x => x.Id,
    new Order()
    {
        Id = 1,
        CustomerId = 101,
        OrderDate = DateTime.Now
    },
    new Order()
    {
        Id = 2,
        CustomerId = 102,
        OrderDate = DateTime.Now.AddDays(-1)
    },
    new Order()
    {
        Id = 3,
        CustomerId = 103,
        OrderDate = DateTime.Now.AddDays(-2)
    },
    new Order()
    {
        Id = 4,
        CustomerId = 104,
        OrderDate = DateTime.Now.AddDays(-3)
    },
    new Order()
    {
        Id = 5,
        CustomerId = 105,
        OrderDate = DateTime.Now.AddDays(-4)

    },
    new Order()
    {
        Id = 6,
        CustomerId = 106,
        OrderDate = DateTime.Now.AddDays(-5)

    },
    new Order()
    {
        Id = 7,
        CustomerId = 101,
        OrderDate = DateTime.Now.AddDays(-6)
    },
    new Order()
    {
        Id = 8,
        CustomerId = 102,
        OrderDate = DateTime.Now.AddDays(-7)
    },
    new Order()
    {
        Id = 9,
        CustomerId = 103,
        OrderDate = DateTime.Now.AddDays(-8)
    },
    new Order()
    {
        Id = 10,
        CustomerId = 104,
        OrderDate = DateTime.Now.AddDays(-9)
    },
    new Order()
    {
        Id = 11,
        CustomerId = 105,
        OrderDate = DateTime.Now.AddDays(-10)

    },
    new Order()
    {
        Id = 12,
        CustomerId = 106,
        OrderDate = DateTime.Now.AddDays(-11)
    }
);
            #endregion

            context.OrderItems.AddOrUpdate(x => x.Id,
new OrderItem()
{
    Id = 1,
    OrderId = 1,
    ProductId = 1,
    Price = 9.99M
    
},
new OrderItem()
{
    Id = 2,
    OrderId = 2,
    ProductId=2,
    Price = 12.95M,
},
new OrderItem()
{
    Id = 3,
    ProductId = 3,
    OrderId=3,
    Price = 15,
},
new OrderItem()
{
    Id = 4,
    ProductId = 4,
    OrderId=4,
    Price=16
},
new OrderItem()
{
    Id = 5,
    ProductId = 5,
    OrderId = 5,
    Price=11

},
new OrderItem()
{
    Id = 6,
    ProductId = 6,
    OrderId = 6,
    Price=17

},
new OrderItem()
{
    Id = 7,
    ProductId = 7,
    OrderId=7,
    Price = 11
},
new OrderItem()
{
    Id = 8,
    ProductId = 8,
    OrderId = 8,
    Price=21
},
new OrderItem()
{
    Id = 9,
    ProductId = 9,
    OrderId = 9,
    Price=19
},
new OrderItem()
{
    Id = 10,
    ProductId = 10,
    OrderId=10,
    Price = 16
},
new OrderItem()
{
    Id = 11,
    ProductId = 11,
    OrderId = 11,
    Price=5.6M

},
new OrderItem()
{
    Id = 12,
    ProductId = 12,
    OrderId = 12,
    Price=7.8M

}
);

        }
    }
}
