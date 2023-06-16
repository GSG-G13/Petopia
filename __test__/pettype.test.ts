import request from 'supertest';
import app from '../src/app';
import addPetType from '../src/queries/pettype/add';
import { deletePetType } from '../src/queries/pettype/delete';
import { editPetType } from '../src/queries/pettype/edit';
import { getAllTypes } from '../src/queries/pettype/showAll';
import { getTypeById } from '../src/queries/pettype/showById';
import sequelize from "../src/database/config";
import buildTables from "../src/database/build";

beforeAll(() => buildTables());
afterAll(() => sequelize.close());


jest.mock('../src/queries/pettype/add');
jest.mock('../src/queries/pettype/delete');
jest.mock('../src/queries/pettype/edit');
jest.mock('../src/queries/pettype/showAll');
jest.mock('../src/queries/pettype/showById');

describe('Test createType controller', () => {
  test('201 | when user enters valid inputs', async () => {
    const mockNewType = {
      typeId: 1,
      title: 'Test Type',
    };

    (addPetType as jest.Mock).mockResolvedValue(mockNewType);

    await request(app)
      .post('/api/v1/types')
      .send({ title: 'Test Type' })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual('Type Created Successfully');
        expect(res.body.data).toEqual(mockNewType);
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
    const mockDeletedType = {
      typeId: 1,
      title: 'Deleted Type',
    };

    (deletePetType as jest.Mock).mockResolvedValue(mockDeletedType);

    await request(app)
      .delete('/api/v1/types/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Type Deleted Successfully');
        expect(res.body.data).toEqual(mockDeletedType);
      });
  });

  test('404 | when type is not found', async () => {
    (deletePetType as jest.Mock).mockResolvedValue(null);

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
      typeId: 1,
      title: 'Updated Type',
    };

    (editPetType as jest.Mock).mockResolvedValue(mockUpdatedType);

    await request(app)
      .put('/api/v1/types/1')
      .send({ title: 'Updated Type' })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('Type Updated Successfully');
        expect(res.body.data).toEqual(mockUpdatedType);
      });
  });

  test('404 | when type is not found', async () => {
    (editPetType as jest.Mock).mockResolvedValue(null);

    await request(app)
      .put('/api/v1/types/99999999999999999991')
      .send({ title: 'Updated Type' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual('The Type Was Not Found');
      });
  });

  test('404 | when type is not found', async () => {
    (editPetType as jest.Mock).mockResolvedValue(null);

    await request(app)
      .put('/api/v1/types/1')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.data).toEqual({"errors": ["Title is required"]});
      });
  });
});

describe('Test showAllTypes controller', () => {
    test('200 | when types are retrieved successfully', async () => {
      const mockTypes = [
        { typeId: 1, title: 'Type 1' },
        { typeId: 2, title: 'Tipe 2' },
      ];
  
      (getAllTypes as jest.Mock).mockResolvedValue(mockTypes);
  
      await request(app)
        .get('/api/v1/types')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(mockTypes);
        });
    });
  });
  
  describe('Test showTypeById controller', () => {
    test('200 | when type is retrieved successfully', async () => {
      const mockType = { typeId: 1, title: 'Type 1' };
      (getTypeById as jest.Mock).mockResolvedValue(mockType);
  
      await request(app)
        .get('/api/v1/types/1999999999999999999')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(mockType);
        });
    });
  
    test('404 | when  type is not found', async () => {
      (getTypeById as jest.Mock).mockResolvedValue(null);
  
      await request(app)
        .get('/api/v1/types/857349857486')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toEqual('The Type Was Not Found');
        });
    });
  });

  