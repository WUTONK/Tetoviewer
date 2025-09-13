// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
import React, { JSX, ReactElement, useEffect, useState } from 'react'
import { Progress, Notification, Spin, Image, ImagePreview, Layout, Nav, Button, Breadcrumb, Skeleton, Avatar, Slider } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconLive, IconSetting } from '@douyinfe/semi-icons';
import fatassTetoIcon from './assets/icon/fatassteto_pixel.png'
import tetoPearIcon from './assets/icon/tetopear_pixel.png'
import svTechieIcon from './assets/icon/SvTechie_pixel.png'
import svTechieAndTetoPearIcon from './assets/icon/tetopearAndSvTechi.png'
import nikeland1 from './assets/img/acc/nike/nikeland_1.jpeg'
import nikeland2 from './assets/img/acc/nike/nikeland_laugh.jpg'


import { Percent } from 'antd/es/progress/style';
import { Flex } from 'antd';
import Column from 'antd/es/table/Column';

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const body = document.body

  const darkModeToggle = (): void => {
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
    } else {
      body.setAttribute('theme-mode', 'dark')
    }
  }

  // JS/TS语法糖 相当于 const Header = Layout.Header
  const { Header, Footer, Sider, Content } = Layout

  const commonStyle = {
    height: 64,
    lineHeight: '64px'
  }

  const [activeKey, setActiveKey] = useState<string>('Home')

  const renderPage = (key: string): JSX.Element => {
    switch (key) {
      case 'Home':
        return <HomeContent />
      case 'fatass':
        return <FatassContent />
      case 'meme':
        return <MemeContent />
      case 'techie':
        return <TechieContent />
      default:
        return <div>Not Found</div>
    }
  }

  // 不同 item 下的 context 组件
  const HomeContent = () => {
    return (
      <div>
        <p> hello I&apos;m Home context</p>
      </div>
    )
  }

  const FatassContent = (): JSX.Element => {
    const [widthValue, setwidthValue] = useState(0)
    const [heightValue, setheightValue] = useState(0)

    return (
      <div style={{ height: '100%', flex: 1, display: 'flex', flexDirection: "row" }}>
        <Layout style={{ height: '100%', flex: 1, display: 'flex', flexDirection: "row" }}>
          <div>
            <p> hello I&apos;m FatassTeto context</p>
            <Image
              width={widthValue * 5}
              height={heightValue * 5}
              src={nikeland1}
            />
          </div>
        </Layout>

        <Layout style={{ flex: 1, display: 'flex', flexDirection: "row" }}>
          <div>
            <p> 宽度 </p>
            <Slider
              showBoundary={true}
              onChange={(value) => setwidthValue(typeof value === 'number' ? value : 0)}
              handleDot={{ size: '4px' }}
              style={{ width: '300px' }}
            />
            <p> 长度 </p>
            <Slider
              showBoundary={true}
              onChange={(value) => setheightValue(typeof value === 'number' ? value : 0)}
              handleDot={{ size: '4px' }}
              style={{ width: '300px' }}
            />
          </div>
        </Layout>
      </div>
    )
  }

  const MemeContent = () => {
    // 练习通知 进度条 骨架屏 加载器 按钮


    const [loading, setLoading] = useState<boolean>(false)
    const [loadImgNum,setLoadImgNum] = useState(0)

    // 惯例hook use开头
    const [notificationApi, notificationHolder] = Notification.useNotification() as [
      {
        success: (config: any) => string
        info: (config: any) => string
        error: (config: any) => string
        warning: (config: any) => string
        open: (config: any) => string
        close: (instanceID: string) => void
      },
      React.ReactElement
    ]
    const toggleLoading = (): void => {
      if (loading === true) {
        setLoading(false)
      } else {
        setLoading(true)
      }
    }
    // ---通知---

    const displayNotification = () => {
      notificationApi.info({
        title: '通知测试',
        content: 'Nuclear War is Bad for Kittens.',
        duration: 5,
        position: 'topRight'
      })
    }

    // ---精度条---
    // 加载进度
    const [loadingProgress, setLoadingProgress] = useState(0)
    useEffect(() => {
      if (!loading) {
        setLoadingProgress(0)
        setLoadImgNum(1)
        return
      }

      setLoadingProgress(0);
      const progressInterval = window.setInterval(() => {
        // woc 我悟了 这里的prev的意思是 将setLoadingProgress这个state的 LoadingProgres 的 previous state（前一个状态值）传进去
        setLoadingProgress(prev => {
          if (prev >= 100) {
            window.clearInterval(progressInterval);
            setLoadImgNum(2)
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => window.clearInterval(progressInterval);
    }, [loading])


    return (
      // 点击按钮后1秒加载出图片（透明度逐渐增加） 期间进度条从0->100 格式化尾缀 '>' -> '>>>'
      <div>
        <p> hello I&apos;m Meme context</p>
        <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {notificationHolder}
          <Button type='danger' style={{ margin: '20px' }} onClick={() => {
              toggleLoading()
              displayNotification()
             }}>给我一个🍐</Button>
        </Layout>
        <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
          <Skeleton style={{ width: '150px', height: '200px' }} placeholder={<Skeleton.Image />} loading={!loading}>
            <Image
              src={loadImgNum === 1 ? nikeland1 : loadImgNum === 2 ? nikeland2 : nikeland1}
              height={200}
              width={150}
              alt='nickland1'
            />
          </Skeleton>
        </Layout>

        <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: 20 }}>
          {/* 进度条 */}
          <div style={{ display:'flex', alignItems: 'center' }}>
              <Progress percent={loadingProgress} showInfo={true} format={() => loadingProgress + "%" } style={{width:300}}></Progress>
              <Spin spinning={loading} style={{marginLeft:30}}></Spin>
          </div>
        </Layout>
      </div>
    )
  }

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//<<<立绘页面
  const TechieContent = () => {

    // 立绘图片引入
      const tachieImages = Object.values(
        import.meta.glob('./assets/img/teto/tachie/*.{jpg,png}', {
          eager: true,
          import: 'default',
        })
      ) as string[];
      // 排序数组 使用本地化排序来正确排序 unicode 字符
      tachieImages.sort((a, b) => a.localeCompare(b));

      const [index, setIndex] = useState(0);

    return (
      <div>
        <div>
          <p> hello I&apos;m Techie context</p>
        </div>

        {/* 画廊 */}
        <Layout style={{display: Flex, flexDirection: 'row'}}>
          {/* 方框画廊 */}
          <Layout style={{flex:1}}>
            <div>
              <img src={tachieImages[index]} alt={`tachie_${index + 1}`} style={{width:200, height:200}}/>
              <Button onClick={() => setIndex((i) => (i - 1 + tachieImages.length) % tachieImages.length)}>上一张</Button>
              <Button onClick={() => setIndex((i) => (i + 1) % tachieImages.length)}>下一张</Button>
            </div>
          </Layout>

          {/* 宽画廊 */}
          {/* 做成有左右切换按钮 且可以自动引入并识别 wide 标识尾缀的 */}
          <Layout style={{flex:3}}>
            <button style={{width:'100%'}}>111</button>
          </Layout>
        </Layout>
      </div>
    )
  }


  return (
    <>
      {/* 逆天 这个居然是靠先后顺序改变布局的 字节跳动资本你赢了 */}
      <Layout style={{ border: '1px solid var(--semi-color-border)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header style={{ ...commonStyle }}>
          <div>
            <Nav mode='horizontal' defaultSelectedKeys={['Home']} style={{ ...commonStyle }}>
              <Nav.Header>
                <img src={svTechieAndTetoPearIcon} alt="Logo" style={{ height: '32px' }}></img>
              </Nav.Header>
              <span
                style={{
                  color: 'var(--semi-color-text-2)',
                }}
              >
                <span
                  style={{
                    marginRight: '24px',
                    color: 'var(--semi-color-text-0)',
                    fontWeight: '600',
                  }}
                >
                  模版推荐
                </span>
                <span style={{ marginRight: '24px' }}>
                  <Button onClick={darkModeToggle}>切换色彩模式</Button>
                </span>
              </span>
              <Nav.Footer>
                <Avatar size="small">
                  WUTONK
                </Avatar>
              </Nav.Footer>
            </Nav>
          </div>
        </Header>

        <Layout style={{ flex: 1, display: 'flex' }}>
          <Sider>
            <Nav
              style={{ maxWidth: 200, height: '100%' }}
              selectedKeys={[activeKey]}
              items={[
                { itemKey: 'Home', text: 'Home', icon: <IconHome size="large" /> },
                { itemKey: 'fatass', text: 'fatass', icon: <img src={fatassTetoIcon} alt="fatass" style={{ width: '24px', height: '24px' }} /> },
                { itemKey: 'meme', text: 'meme', icon: <img src={tetoPearIcon} alt='tetopear' style={{ width: '24px', height: '30px' }} /> },
                { itemKey: 'techie', text: 'techie', icon: <img src={svTechieIcon} alt='svTechie' style={{ width: '30px', height: '50px' }} /> },
              ]}
              onSelect={(data) => setActiveKey(String(data.itemKey))}
              footer={{
                collapseButton: true
              }}
            />
          </Sider>

          <Content>
            {renderPage(activeKey)}
          </Content>
        </Layout>

        <Footer style={{ ...commonStyle, border: '1px solid var(--semi-color-border)', background: 'var(--semi-color-bg-0)' }}>Footer</Footer>
      </Layout>

      {/* <Button onClick={ipcHandle}>Hello Semi</Button>
      <Button onClick={darkModeToggle}>darkMode</Button> */}
    </>
  )
}

export default App
