import type { User } from '../entities/user.entity';

// TODO: Usar interfaces si solo se va a definir un contrato
export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  // TODO: Aplicar patrón criteria
  abstract findAll(): Promise<User[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, user: User): Promise<void>;
}
