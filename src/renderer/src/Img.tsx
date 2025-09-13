import React, { useMemo, useCallback } from 'react';
import { Image, ImagePreview, Button, Layout } from '@douyinfe/semi-ui';
import { IconChevronLeft, IconChevronRight, IconMinus, IconPlus, IconRotate, IconDownload, IconRealSizeStroked, IconWindowAdaptionStroked } from "@douyinfe/semi-icons";
import tachie_1 from './assets/img/teto/tachie/tachie_1.jpg'
import tachie_2 from './assets/img/teto/tachie/tachie_2.jpg'
import tachie_3 from './assets/img/teto/tachie/tachie_3.jpg'
import tachie_4 from './assets/img/teto/tachie/tachie_4.jpg'


function Img(): React.JSX.Element {

const srcList = useMemo(()=>{
  return [tachie_1, tachie_2,tachie_3]
},[])

const srcList2 = useMemo(() => ([
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/greenleaf.jpg",
  "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/colorful.jpg",
]), []);

return (
  <Layout style={{width: '100%', height: "100%"}}>
    <Layout style={{flex: 1, display: 'flex', alignItems: 'center'}}>
      <Image
          width={360}
          height={200}
          src={tachie_4}
      />
    </Layout>

    <Layout style={{flex: 1, display: 'flex', alignItems: 'center'}}>
      <ImagePreview>
        {srcList.map((src,index) => {
          return(
            <Image
              key={index}
              src={src}
              width={200}
              alt={`${index+1}`}
              style={{margin: 5}}
            />
          )
        })}
      </ImagePreview>
    </Layout>

    <Layout style={{flex: 1, display: 'flex', alignItems: 'center'}}>
      <ImagePreview>
        {srcList2.map((src, index) => {
            return (
                <Image
                    key={index}
                    src={src}
                    width={200}
                    alt={`lamp${index + 1}`}
                    style={{ marginRight: 5 }}
                />
            );
        })}
      </ImagePreview>
    </Layout>
  </Layout>
);
};



export default Img
