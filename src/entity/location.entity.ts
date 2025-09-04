import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

export interface ICreateLocationDTO extends Omit<Location, 'id' | 'createdAt' | 'updatedAt'> {}

@Entity()
export default class Location {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  lower_ip: string;

  @Column({ unique: true })
  upper_ip: string;

  @Column()
  country_code: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @Column()
  city: string;
}