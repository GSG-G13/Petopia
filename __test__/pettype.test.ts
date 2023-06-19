import request from 'supertest';
import app from '../src/app';
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());

describe('Test showTypeById controller', () => {
  test('200 | when type is retrieved successfully', async () => {
    const mockType = { typeId: 1, title: 'Dog' };
    await request(app)
      .get('/api/v1/types/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toMatchObject(mockType);
      });
  });

  test('404 | when  type is not found', async () => {
    await request(app)
      .get('/api/v1/types/857349857486')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toEqual('The Type Was Not Found');
      });
  });
});

describe('Test showAllTypes controller', () => {
    test('200 | when types are retrieved successfully', async () => {
      const mockTypes = [
        { typeId: 1, title: 'Dog' },
        { typeId: 2, title: 'Cat' },
        { typeId: 3, title: 'Bird' },
      ];
  
      await request(app)
        .get('/api/v1/types')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toMatchObject(mockTypes);
        });
    });
  });


describe('Test createType controller', () => {
  test('201 | when user enters valid inputs', async () => {
    const mockNewType = {
      typeId: 4,
      title: 'Test Type',
    };

    await request(app)
      .post('/api/v1/types')
      .send({ title: 'Test Type' })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual('Type Created Successfully');
        expect(res.body.data).toMatchObject(mockNewType);
      });
  });

  test('400 | when user does not provide a title', async () => {
    await request(app)
      .post('/api/v1/types')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["Title is required"]});
      });
  });
});

describe('Test deleteType controller', () => {
  test('200 | when type is deleted successfully', async () => {
    await request(app)
      .delete('/api/v1/types/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Type Deleted Successfully');
      });
  });

  test('404 | when type is not found', async () => {
    await request(app)
      .delete('/api/v1/types/888881')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('The Type Was Not Found');
      });
  });
});

describe('Test updateType controller', () => {
  test('200 | when Type is updated successfully', async () => {
    const mockUpdatedType = {
      typeId: 2,
      title: 'Updated Type',
    };

    await request(app)
      .put('/api/v1/types/2')
      .send({ title: 'Updated Type' })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Type Updated Successfully');
        expect(res.body.data).toMatchObject(mockUpdatedType);
      });
  });

  test('400 | when type is not found', async () => {
    await request(app)
      .put('/api/v1/types/91')
      .send({ title: 'Updated Type' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('The Type Was Not Found');
      });
  });

  test('400 | when type is not found', async () => {
    await request(app)
      .put('/api/v1/types/1')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["Title is required"]});
      });
  });

  test('400 | when typeId is exceeded the integer length', async () => {
    await request(app)
      .put('/api/v1/types/99999999999999999991')
      .send({ title: 'Updated Type' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Please Enter a valid id number');
      });
  });
});

  
  