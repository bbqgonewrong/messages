import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
@Controller('messages')
export class MessagesController {

    

constructor(public messagesService : MessagesService){
    
}

@Get()
listMessages(){
   return this.messagesService.findAll();
}    

@Post()
postMessage(@Body() body:CreateMessageDto){
    console.log(body);
    return this.messagesService.create(body.content);
    }

@Get('/:id')
async getMessage(@Param('id') id:string){
    console.log(id);
    const message = await this.messagesService.findOne(id);

    if(!message){
        throw new NotFoundException('This is not a valid id');
    }
    return message;
    }

}
