import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: false }) // can be set manually in the database, or later via backoffice
  isAdmin: boolean;
}
