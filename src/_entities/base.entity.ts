import { randomUUID } from "crypto"
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class BaseEntity {

    @PrimaryColumn()
    id: string
    @Column()
    createdAt: Date
    @Column()
    updatedAt: Date

    trackChanges() {
        if (this.id) {
            this.updatedAt = new Date()
        } else {
            this.id = randomUUID();
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
    }
}   