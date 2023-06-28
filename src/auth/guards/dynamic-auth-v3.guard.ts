// AuthGaurd 에서 google,naver,kakao 를 동적으로 받기 위한 guard이다.
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

const DYNAMIC_AUTH_GUARD = {
  google: new (class extends AuthGuard('google') {})(),
  kakao: new (class extends AuthGuard('kakao') {})(),
  naver: new (class extends AuthGuard('naver') {})(),
};

export class DynamicAuthV3Guard implements CanActivate {
  // canActivate 는 boolean, Promise<boolean>, Observable<boolean> 을 리턴한다.
  // canActivate는 google, kakao, naver 를 동적으로 받아야 한다.
  canActivate(context: ExecutionContext) {
    // 리퀘스트 추출
    const request = context.switchToHttp().getRequest();
    const social = request.params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
