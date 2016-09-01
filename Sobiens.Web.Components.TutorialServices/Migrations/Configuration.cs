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

        }
    }
}
