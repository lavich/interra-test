import FieldService from "./FieldService";
import Operation from "src/models/Operation";

const fieldService = new FieldService();

/**
 * Имитирует api для получения истории операций по тестовому полю
 * @param {string } fieldName
 * @returns {Promise<Array<Operation>>}
 */
export const fetchFieldOperations = (fieldName: string): Promise<Operation[]> =>
  fieldService.getOperations();

/**
 * Имитирует api для получения операции по тестовому полю
 * @param {string } fieldName
 * @param {string } operationId
 * @returns {Promise<Operation || null>}
 */
export const fetchFieldOperation = (
  fieldName: string,
  operationId: string
): Promise<Operation | null> => fieldService.getOperation(operationId);


/**
 * Имитирует api для создания операции по тестовому полю
 * @param {string } fieldName
 * @param {Operation } newOperation
 * @returns {Promise<Operation>}
 */
export const createFieldOperation = (
  fieldName: string,
  newOperation: Operation
): Promise<Operation> => fieldService.saveOperation(newOperation);
