// AuthGaurd 에서 google,naver,kakao 를 동적으로 받기 위한 guard이다.
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const DYNAMIC_AUTH_GUARD = ['google', 'kakao', 'naver'].reduce((prev, curr) => {
  // result는 prev자리이다.
  return {
    ...prev,
    // [curr] 은 curr 안에 있는 변수값을 말한다.
    [curr]: new (class extends AuthGuard(curr) {})(),
  };
}, {});

export class DynamicAuthGuard implements CanActivate {
  // canActivate 는 boolean, Promise<boolean>, Observable<boolean> 을 리턴한다.
  // canActivate는 google, kakao, naver 를 동적으로 받아야 한다.
  canActivate(context: ExecutionContext) {
    // 리퀘스트 추출
    const request = context.switchToHttp().getRequest();
    const { social } = request.params;
    console.log(social);
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
