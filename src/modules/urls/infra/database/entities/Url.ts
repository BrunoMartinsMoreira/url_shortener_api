import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  last_click_date: Date;
}

export { Url };
