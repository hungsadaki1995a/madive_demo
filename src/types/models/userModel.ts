import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

class UserModel {
  @IsNotEmpty({ message: 'Please, Enter User Id' })
  @MaxLength(128)
  user_id: string;

  @IsNotEmpty({ message: 'Please, Enter User PassWord' })
  @MaxLength(128)
  user_passwd: string;

  @IsNotEmpty({ message: 'Please, Enter User Name' })
  @MaxLength(16)
  user_name: string;

  @IsNotEmpty({ message: 'Please, Enter User Div' })
  @MaxLength(16)
  user_div: string;

  @IsNotEmpty({ message: 'Please, Enter User Email' })
  @MaxLength(64)
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Please, Enter User Phone Number' })
  @MaxLength(15)
  tel_no: string;
}
export default UserModel;
