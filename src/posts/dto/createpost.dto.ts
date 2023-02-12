import { IsNotEmpty,IsOptional,IsString} from 'class-validator';
  
  export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    post: string;

    @IsString()
    @IsOptional()
    link: string;

    @IsString()
    @IsOptional()
    linkName: string;
  }