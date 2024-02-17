import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Friend } from '../../friend/entities/friend.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  password: string;

  @Column({ default: true }) // can be set manually in the database, or later via backoffice
  isAdmin: boolean;

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];
}
