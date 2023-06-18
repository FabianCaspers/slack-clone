export class Message {
    authorId: string;
    messageText: string;
    time: string;

    constructor(obj?: any) {
        this.authorId = obj ? obj.authorId : '';
        this.messageText = obj ? obj.messageText : '';
        this.time = obj ? obj.time : '';
    }

    /*public toJSON() {
        return {
            authorId: this.authorId,
            messageText: this.messageText
        }
    }*/
}