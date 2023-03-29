import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const hashedPassword = await argon.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email: email,
        hashedPassword,
      },
    });

    delete user.hashedPassword;

    return user;
  }

  signin() {
    return { msg: 'Signin' };
  }
}
