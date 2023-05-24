import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

class UserModel {
  @IsNotEmpty()
  @MaxLength(50)
  user_id: string;

  @IsNotEmpty()
  @MaxLength(50)
  user_passwd: string;

  @IsNotEmpty()
  @MaxLength(100)
  user_name: string;

  @IsNotEmpty()
  @MaxLength(100)
  user_div: string;

  @IsNotEmpty()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @Matches(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/g, {
  //   message: 'Please Vietnamese phone number format'
  // })
  tel_no: string;
}
export default UserModel;
