import request from 'supertest';
import app from '../src/app';
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe('Test showAllCategories controller', () => {
  test('200 | when categories are retrieved successfully', async () => {
    await request(app)
      .get('/api/v1/categories')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject([
          {
            categoryId: 1,
            title: 'Adoption',
          }, {
            categoryId: 2,
            title: 'Breed',
          }, {
            categoryId: 3,
            title: 'Post',
          }, {
            categoryId: 4,
            title: 'Sell',
          }]);
      });
  });
});

describe('Test showCategoryById controller', () => {
  test('200 | when category is retrieved successfully', async () => {
    await request(app)
      .get('/api/v1/categories/2')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject({ categoryId: 2, title: 'Breed' });
      });
  });

  test('404 | when  category is not found', async () => {
    await request(app)
      .get('/api/v1/categories/857349857486')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual('The Category Was Not Found');
      });
  });
});

describe('Test createCategory controller', () => {
  test('201 | when user enters valid inputs', async () => {
    await request(app)
      .post('/api/v1/categories')
      .send({ title: 'Test Category' })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual('Category Created Successfully');
        expect(res.body.data).toMatchObject({
          categoryId: 5,
          title: 'Test Category',
        });
      });
  });

  test('400 | when user does not provide a title', async () => {
    await request(app)
      .post('/api/v1/categories')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["Title is required"]});
      });
  });
});

describe('Test deleteCategory controller', () => {
  test('200 | when category is deleted successfully', async () => {

    await request(app)
      .delete('/api/v1/categories/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Category Deleted Successfully');
      });
  });

  test('404 | when category is not found', async () => {
    await request(app)
      .delete('/api/v1/categories/888881')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('The Category Was Not Found');
      });
  });
});

describe('Test updateCategory controller', () => {
  test('200 | when category is updated successfully', async () => {

    await request(app)
      .put('/api/v1/categories/2')
      .send({ title: 'Updated Category' })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Category Updated Successfully');
        expect(res.body.data).toMatchObject({
          categoryId: 2,
          title: 'Updated Category',
        });
      });
  });

  test('404 | when category is not found', async () => {
    await request(app)
      .put('/api/v1/categories/99999999999999999991')
      .send({ title: 'Updated Category' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('The Category Was Not Found');
      });
  });

  test('404 | when category is not found', async () => {

    await request(app)
      .put('/api/v1/categories/1')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["Title is required"]});
      });
  });
});
