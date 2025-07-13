import { fromAfterNextRender } from '@mixin-ui/cdk';

const afterNextRender = fromAfterNextRender();

afterNextRender.subscribe(console.log);
