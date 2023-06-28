// AuthGaurd 에서 google,naver,kakao 를 동적으로 받기 위한 guard이다.
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

class GoogleAuthGuard extends AuthGuard('google') {}
class KakaoAuthGuard extends AuthGuard('kakao') {}
class NaverAuthGuard extends AuthGuard('naver') {}
const googleAuthGuard = new GoogleAuthGuard(); // 구글 oauth 인스턴스 생성
const kakaoAuthGuard = new KakaoAuthGuard(); // 구글 oauth 인스턴스 생성
const naverAuthGuard = new NaverAuthGuard(); // 구글 oauth 인스턴스 생성

export class DynamicAuthV1Guard implements CanActivate {
  // canActivate 는 boolean, Promise<boolean>, Observable<boolean> 을 리턴한다.
  // canActivate는 google, kakao, naver 를 동적으로 받아야 한다.
  canActivate(context: ExecutionContext) {
    // 리퀘스트 추출
    const request = context.switchToHttp().getRequest();
    const social = request.params;
    if (social === 'google') return googleAuthGuard.canActivate(context);
    if (social === 'kakao') return kakaoAuthGuard.canActivate(context);
    if (social === 'naver') return naverAuthGuard.canActivate(context);
  }
}
