import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

type ValidateEntitiesOwnershipParams = {
  userId: string;
  bankAccountId: string;
  categoryId: string;
  transactionId?: string;
};

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransationOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepo.findMany({ where: { userId } });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      categoryId,
      transactionId,
      bankAccountId,
    });

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: { date, name, type, value, bankAccountId, categoryId },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateTransationOwnershipService.validate(
      userId,
      transactionId,
    );

    await this.transactionsRepo.delete({ where: { id: transactionId } });

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    categoryId,
    transactionId,
    bankAccountId,
  }: ValidateEntitiesOwnershipParams) {
    const validateBankAccountOwnership =
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    const validateCategoryOwnership =
      this.validateCategoryOwnershipService.validate(userId, categoryId);

    await Promise.all([
      transactionId &&
        this.validateTransationOwnershipService.validate(userId, transactionId),
      validateCategoryOwnership,
      validateBankAccountOwnership,
    ]);
  }
}
