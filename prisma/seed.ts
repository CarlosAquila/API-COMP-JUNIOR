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
      where: { email: 'alugador@gmail.com.br' },
      update: {},
      create: {
        email: 'alugador@gmail.com.br',
        password: hashedPassword,
        name: 'Alugador',
        roles: { connect: { name: 'basic user' } },
      },
    }),
    prisma.user.upsert({
      where: { email: 'bibliotecario@gmail.com.br' },
      update: {},
      create: {
        email: 'bibliotecario@gmail.com.br',
        password: hashedPassword,
        name: 'Bibliotecario',
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
      data: { name: "Author One", biography: "Biography of Author One" },
    }),
    prisma.author.create({
      data: { name: "Author Two", biography: "Biography of Author Two" },
    }),
    prisma.author.create({
      data: { name: "Author Three", biography: "Biography of Author Three" },
    }),
    prisma.author.create({
      data: { name: "Author Four", biography: "Biography of Author Four" },
    }),
    prisma.author.create({
      data: { name: "Author Five", biography: "Biography of Author Five" },
    }),
    prisma.author.create({
      data: { name: "Author Six", biography: "Biography of Author Six" },
    }),
    prisma.author.create({
      data: { name: "Author Seven", biography: "Biography of Author Seven" },
    }),
    prisma.author.create({
      data: { name: "Author Eight", biography: "Biography of Author Eight" },
    }),
    prisma.author.create({
      data: { name: "Author Nine", biography: "Biography of Author Nine" },
    }),
    prisma.author.create({
      data: { name: "Author Ten", biography: "Biography of Author Ten" },
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
  const fantasyCategory = await prisma.category.findUnique({ where: { name: "Fantasy" } });
  const authorOne = await prisma.author.findUnique({ where: { name: "Author One" } });
  const penguinPublisher = await prisma.publisher.findUnique({ where: { name: "Penguin Random House" } });


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
            // Add more author IDs as needed
          ] 
        },
        categories: { 
          connect: [
            { id: categories[0].id },
            // Add more category IDs as needed
          ] 
        },
        visible: true,
      },
    }),
    prisma.book.create({
      data: {
        title: "Moby Dick",
        description: "A novel by Herman Melville",
        isbn: "9781503280786",
        year: 1851,
        publisher: { connect: { id: publishers[0].id } },
        authors: { 
          connect: [
            { id: authors[0].id },
            // Add more author IDs as needed
          ] 
        },
        categories: { 
          connect: [
            { id: categories[0].id },
            // Add more category IDs as needed
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