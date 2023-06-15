import request from 'supertest';
import app from '../src/app';
import addCategory from '../src/queries/category/add';
import { deleteCategoryById } from '../src/queries/category/delete';
import { editCategory } from '../src/queries/category/edit';
import { getAllCategories } from '../src/queries/category/showAll';
import { getCategoryById } from '../src/queries/category/showById';
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());


jest.mock('../src/queries/category/add');
jest.mock('../src/queries/category/delete');
jest.mock('../src/queries/category/edit');
jest.mock('../src/queries/category/showAll');
jest.mock('../src/queries/category/showById');

describe('Test createCategory controller', () => {
  test('201 | when user enters valid inputs', async () => {
    const mockNewCategory = {
      categoryId: 1,
      title: 'Test Category',
    };

    (addCategory as jest.Mock).mockResolvedValue(mockNewCategory);

    await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Test Category' })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual('Category created successfully');
        expect(res.body.data).toEqual(mockNewCategory);
      });
  });

  test('400 | when user does not provide a title', async () => {
    await request(app)
      .post('/api/v1/categories')
      .send({})
      .expect(400)
      .expect((res) => {
        console.log(res.body.data);
        expect(res.body.data).toEqual({"errors": ["Title is required"]});
      });
  });
});

describe('Test deleteCategory controller', () => {
  test('200 | when category is deleted successfully', async () => {
    const mockDeletedCategory = {
      categoryId: 1,
      title: 'Deleted Category',
    };

    (deleteCategoryById as jest.Mock).mockResolvedValue(mockDeletedCategory);

    await request(app)
      .delete('/api/v1/categories/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Category Deleted Successfully');
        expect(res.body.data).toEqual(mockDeletedCategory);
      });
  });

  test('404 | when category is not found', async () => {
    (deleteCategoryById as jest.Mock).mockResolvedValue(null);

    await request(app)
      .delete('/api/v1/categories/888881')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual('The Category Was Not Found');
      });
  });
});

describe('Test updateCategory controller', () => {
  test('200 | when category is updated successfully', async () => {
    const mockUpdatedCategory = {
      categoryId: 1,
      title: 'Updated Category',
    };

    (editCategory as jest.Mock).mockResolvedValue(mockUpdatedCategory);

    await request(app)
      .put('/api/v1/categories/1')
      .send({ title: 'Updated Category' })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Category Updated Successfully');
        expect(res.body.data).toEqual(mockUpdatedCategory);
      });
  });

  test('404 | when category is not found', async () => {
    (editCategory as jest.Mock).mockResolvedValue(null);

    await request(app)
      .put('/api/v1/categories/99999999999999999991')
      .send({ title: 'Updated Category' })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual('The Category Was Not Found');
      });
  });
});

describe('Test showAllCategories controller', () => {
    test('200 | when categories are retrieved successfully', async () => {
      const mockCategories = [
        { categoryId: 1, title: 'Category 1' },
        { categoryId: 2, title: 'Category 2' },
      ];
  
      (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  
      await request(app)
        .get('/api/v1/categories')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(mockCategories);
        });
    });
  });
  
  describe('Test showCategoryById controller', () => {
    test('200 | when category is retrieved successfully', async () => {
      const mockCategory = { categoryId: 1, title: 'Category 1' };
      (getCategoryById as jest.Mock).mockResolvedValue(mockCategory);
  
      await request(app)
        .get('/api/v1/categories/1999999999999999999')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(mockCategory);
        });
    });
  
    test('404 | when  category is not found', async () => {
      (getCategoryById as jest.Mock).mockResolvedValue(null);
  
      await request(app)
        .get('/api/v1/categories/857349857486')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toEqual('The Category Was Not Found');
        });
    });
  });

  