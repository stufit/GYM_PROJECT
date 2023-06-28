// AuthGaurd 에서 google,naver,kakao 를 동적으로 받기 위한 guard이다.
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

class GoogleAuthGuard extends AuthGuard('google') {}
class KakaoAuthGuard extends AuthGuard('kakao') {}
class NaverAuthGuard extends AuthGuard('naver') {}

// if문은 object literal lookup 스타일로 리팩토링한다.
const DYNAMIC_AUTH_GUARD = {
  google: new GoogleAuthGuard(),
  kakao: new KakaoAuthGuard(),
  naver: new NaverAuthGuard(),
};

export class DynamicAuthV2Guard implements CanActivate {
  // canActivate 는 boolean, Promise<boolean>, Observable<boolean> 을 리턴한다.
  // canActivate는 google, kakao, naver 를 동적으로 받아야 한다.
  canActivate(context: ExecutionContext) {
    // 리퀘스트 추출
    const request = context.switchToHttp().getRequest();
    const social = request.params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
