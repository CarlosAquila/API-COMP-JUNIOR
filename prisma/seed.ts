import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Create roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: "basic user" },
      update: {},
      create: { name: "basic user", description: "Basic user role" },
    }),
    prisma.role.upsert({
      where: { name: "librarian" },
      update: {},
      create: { name: "librarian", description: "Librarian role" },
    }),
    prisma.role.upsert({
      where: { name: "admin" },
      update: {},
      create: { name: "admin", description: "Admin role" },
    })
  ]);

  // Create permissions
  const models = ['author', 'publisher', 'category', 'loan', 'user', 'employee', 'role', 'permission'];
  const permissions = [];

  for (const model of models) {
    permissions.push(
      await prisma.permission.upsert({
        where: { name: `create ${model}` },
        update: {},
        create: { name: `create ${model}`, description: `Create ${model}` }
      }),
      await prisma.permission.upsert({
        where: { name: `read ${model}` },
        update: {},
        create: { name: `read ${model}`, description: `Read ${model}` }
      }),
      await prisma.permission.upsert({
        where: { name: `update ${model}` },
        update: {},
        create: { name: `update ${model}`, description: `Update ${model}` }
      }),
      await prisma.permission.upsert({
        where: { name: `delete ${model}` },
        update: {},
        create: { name: `delete ${model}`, description: `Delete ${model}` }
      })
    );
  }

  // Assign read permissions to basic user role
  const basicUserPermissions = ['author', 'publisher', 'category'].map(async model => {
    const permission = await prisma.permission.findUnique({ where: { name: `read ${model}` } });
    if (permission) {
      await prisma.role.update({
        where: { name: 'basic user' },
        data: {
          permissions: { connect: { id: permission.id } },
        },
      });
    }
  });

  // Assign create, read, update permissions to librarian role
  const librarianPermissions = ['author', 'publisher', 'category'].flatMap(async model => {
    const readPermission = await prisma.permission.findUnique({ where: { name: `read ${model}` } });
    const createPermission = await prisma.permission.findUnique({ where: { name: `create ${model}` } });
    const updatePermission = await prisma.permission.findUnique({ where: { name: `update ${model}` } });
    const permissionsToConnect = [];
    if (readPermission) permissionsToConnect.push({ id: readPermission.id });
    if (createPermission) permissionsToConnect.push({ id: createPermission.id });
    if (updatePermission) permissionsToConnect.push({ id: updatePermission.id });

    await prisma.role.update({
      where: { name: 'librarian' },
      data: {
        permissions: { connect: permissionsToConnect },
      },
    });
  });

  // Assign loan create, read, update permissions to librarian role
  const loanPermissions = ['create loan', 'read loan', 'update loan'].map(async name => {
    const permission = await prisma.permission.findUnique({ where: { name } });
    if (permission) {
      await prisma.role.update({
        where: { name: 'librarian' },
        data: {
          permissions: { connect: { id: permission.id } },
        },
      });
    }
  });

  await Promise.all([...basicUserPermissions, ...librarianPermissions, ...loanPermissions]);

  // Hash the password
  const hashedPassword = await bcrypt.hash('12345as16', 10);

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'tenant@gmail.com.br' },
      update: {},
      create: {
        email: 'tenant@gmail.com.br',
        password: hashedPassword,
        name: 'Tenant',
        roles: { connect: { name: 'basic user' } },
      },
    }),
    prisma.user.upsert({
      where: { email: 'librarian@gmail.com.br' },
      update: {},
      create: {
        email: 'librarian@gmail.com.br',
        password: hashedPassword,
        name: 'Librarian',
        roles: { connect: { name: 'librarian' } },
      },
    }),
    prisma.user.upsert({
      where: { email: 'admin@gmail.com.br' },
      update: {},
      create: {
        email: 'admin@gmail.com.br',
        password: hashedPassword,
        name: 'Admin',
        roles: { connect: { name: 'admin' } },
      },
    })
  ]);

  // Create employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: "Employee One",
        cpf: "11111111111",
        telephone: "1111-1111",
        address: "Address 1"
      },
    }),
    prisma.employee.create({
      data: {
        name: "Employee Two",
        cpf: "22222222222",
        telephone: "2222-2222",
        address: "Address 2"
      },
    }),
    prisma.employee.create({
      data: {
        name: "Employee Three",
        cpf: "33333333333",
        telephone: "3333-3333",
        address: "Address 3"
      },
    })
  ]);

  // Create publishers
  const publishers = await Promise.all([
    prisma.publisher.upsert({
      where: { name: "Penguin Random House" },
      update: {},
      create: { name: "Penguin Random House", address: "New York, USA" },
    }),
    prisma.publisher.upsert({
      where: { name: "HarperCollins" },
      update: {},
      create: { name: "HarperCollins", address: "New York, USA" },
    }),
    prisma.publisher.upsert({
      where: { name: "Simon & Schuster" },
      update: {},
      create: { name: "Simon & Schuster", address: "New York, USA" },
    }),
    prisma.publisher.upsert({
      where: { name: "Hachette Book Group" },
      update: {},
      create: { name: "Hachette Book Group", address: "Paris, France" },
    }),
    prisma.publisher.upsert({
      where: { name: "Macmillan Publishers" },
      update: {},
      create: { name: "Macmillan Publishers", address: "London, UK" },
    }),
    prisma.publisher.upsert({
      where: { name: "Scholastic" },
      update: {},
      create: { name: "Scholastic", address: "New York, USA" },
    }),
    prisma.publisher.upsert({
      where: { name: "Houghton Mifflin Harcourt" },
      update: {},
      create: { name: "Houghton Mifflin Harcourt", address: "Boston, USA" },
    }),
    prisma.publisher.upsert({
      where: { name: "Pearson" },
      update: {},
      create: { name: "Pearson", address: "London, UK" },
    }),
    prisma.publisher.upsert({
      where: { name: "Wiley" },
      update: {},
      create: { name: "Wiley", address: "Hoboken, USA" },
    }),
    prisma.publisher.upsert({
      where: { name: "Cengage" },
      update: {},
      create: { name: "Cengage", address: "Boston, USA" },
    })
  ]);

  // Create authors
  const authors = await Promise.all([
    prisma.author.create({
      data: { name: "J.R.R. Tolkien", biography: "English writer, poet, and philologist, best known for The Lord of the Rings." },
    }),
    prisma.author.create({
      data: { name: "J.K. Rowling", biography: "British author, best known for the Harry Potter series." },
    }),
    prisma.author.create({
      data: { name: "George R.R. Martin", biography: "American novelist and short story writer, known for A Song of Ice and Fire series." },
    }),
    prisma.author.create({
      data: { name: "Agatha Christie", biography: "English writer known for her 66 detective novels and 14 short story collections." },
    }),
    prisma.author.create({
      data: { name: "Stephen King", biography: "American author of horror, supernatural fiction, suspense, and fantasy novels." },
    }),
    prisma.author.create({
      data: { name: "Jane Austen", biography: "English novelist known for her six major novels, including Pride and Prejudice." },
    }),
    prisma.author.create({
      data: { name: "Mark Twain", biography: "American writer, humorist, and lecturer, best known for The Adventures of Tom Sawyer and Adventures of Huckleberry Finn." },
    }),
    prisma.author.create({
      data: { name: "Ernest Hemingway", biography: "American novelist, short story writer, and journalist, known for works like The Old Man and the Sea." },
    }),
    prisma.author.create({
      data: { name: "F. Scott Fitzgerald", biography: "American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century." },
    }),
    prisma.author.create({
      data: { name: "Isaac Asimov", biography: "American writer and professor of biochemistry, known for his works of science fiction and popular science." },
    })
  ]);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Fiction", description: "Fiction books" },
    }),
    prisma.category.create({
      data: { name: "Non-Fiction", description: "Non-Fiction books" },
    }),
    prisma.category.create({
      data: { name: "Science", description: "Science books" },
    }),
    prisma.category.create({
      data: { name: "Fantasy", description: "Fantasy books" },
    }),
    prisma.category.create({
      data: { name: "History", description: "History books" },
    }),
    prisma.category.create({
      data: { name: "Biography", description: "Biography books" },
    }),
    prisma.category.create({
      data: { name: "Technology", description: "Technology books" },
    }),
    prisma.category.create({
      data: { name: "Education", description: "Education books" },
    }),
    prisma.category.create({
      data: { name: "Self-Help", description: "Self-Help books" },
    }),
    prisma.category.create({
      data: { name: "Art", description: "Art books" },
    })
  ]);

  // Create books
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: "The Hobbit",
        description: "A novel by Harper Lee",
        isbn: "9780061120084",
        year: 1960,
        publisher: { connect: { id: publishers[0].id } },
        authors: { 
          connect: [
            { id: authors[0].id },
          ] 
        },
        categories: { 
          connect: [
            { id: categories[0].id },
          ] 
        },
        visible: true,
      },
    }),
    prisma.book.create({
      data: {
        title: "Harry Potter and the Philosopher's Stone",
        description: "A novel by J.K. Rowling",
        isbn: "9781503280786",
        year: 1851,
        publisher: { connect: { id: publishers[0].id } },
        authors: { 
          connect: [
            { id: authors[1].id },
          ] 
        },
        categories: { 
          connect: [
            { id: categories[3].id },
          ] 
        },
        visible: true,
      },
    }),
    prisma.book.create({
      data: {
        title: "A Game of Thrones",
        description: "A novel by George R.R. Martin",
        isbn: "9780553103540",
        year: 1851,
        publisher: { connect: { id: publishers[0].id } },
        authors: { 
          connect: [
            { id: authors[2].id },
          ] 
        },
        categories: { 
          connect: [
            { id: categories[3].id }, // Fantasy
            { id: categories[0].id }  // Fiction
          ] 
        },
        visible: true,
      },
    })
  ]);

  // Create loans
  const loans = await Promise.all([
    prisma.loan.create({
      data: {
        loanDate: new Date('2024-05-15'),
        dueDate: new Date('2024-05-25'),
        returnDate: null,
        fees: 0,
        returned: false,
        user: { connect: { email: 'alugador@gmail.com.br' } },
        employee: { connect: { id: employees[0].id } },
        book: { connect: { id: books[0].id } }
      },
    }),
    prisma.loan.create({
      data: {
        loanDate: new Date('2024-05-04'),
        dueDate: new Date('2024-05-14'),
        returnDate: null,
        fees: 0,
        returned: false,
        user: { connect: { email: 'alugador@gmail.com.br' } },
        employee: { connect: { id: employees[1].id } },
        book: { connect: { id: books[1].id } }
      },
    })
  ]);

  console.log({ roles, permissions, users, employees, publishers, authors, categories, books, loans });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });