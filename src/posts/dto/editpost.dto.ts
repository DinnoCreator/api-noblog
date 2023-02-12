import {IsString,IsOptional} from 'class-validator';
  
  export class EditPostDto {
    @IsString()
    @IsOptional()
    title: string;
  
    @IsString()
    @IsOptional()
    post: string;
  }