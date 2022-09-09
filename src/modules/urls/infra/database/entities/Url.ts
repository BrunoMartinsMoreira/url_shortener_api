import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../../../users/infra/database/entities/User';

@Entity('urls')
class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  original_url: string;

  @Column()
  hash: string;

  @Column()
  clicks: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  short_url: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, default: null })
  last_click_date: Date;
}

export { Url };
