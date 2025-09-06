// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
import React, { JSX, useState } from 'react'
import { Image, ImagePreview,Layout, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { Slider,IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconLive, IconSetting } from '@douyinfe/semi-icons';
import fatassTetoIcon from './assets/icon/fatassteto_pixel.png'
import tetoPearIcon from './assets/icon/tetopear_pixel.png'
import svTechieIcon from './assets/icon/SvTechie_pixel.png'
import svTechieAndTetoPearIcon from './assets/icon/tetopearAndSvTechi.png'
import nikeland1 from './assets/img/acc/nike/nikeland_1.jpeg'

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
    return(
      <div>
        <p> hello I&apos;m Home context</p>
      </div>
    )
  }

  const FatassContent = () => {
    return(
      <div>
        <p> hello I&apos;m FatassTeto context</p>
        <Image
          width={500}
          height={100}
          src={nikeland1}
        />
      </div>
    )
  }

  const MemeContent = () => {
    return(
      <div>
        <p> hello I&apos;m Home context</p>
      </div>
    )
  }

  const TechieContent = () => {
    return(
      <div>
        <p> hello I&apos;m Home context</p>
      </div>
    )
  }



  return (
    <>
      {/* 逆天 这个居然是靠先后顺序改变布局的 字节跳动资本你赢了 */}
      <Layout style={{ border: '1px solid var(--semi-color-border)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header style={{ ...commonStyle, background: 'rgba(var(--semi-pink-8), 1)' }}>
          <div>
            <Nav mode='horizontal' defaultSelectedKeys={['Home']} style={{...commonStyle,background: 'rgba(var(--semi-pink-1), 1)'}}>
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
                <span style={{ marginRight: '24px' }}>所有模版</span>
                <span>我的模版</span>
              </span>
              <Nav.Footer>
                <Avatar color="pink" size="small">
                                  WUTONK
                </Avatar>
              </Nav.Footer>
            </Nav>
          </div>
        </Header>

        <Layout style={{ flex: 1, display: 'flex' }}>
          <Sider style={{background: 'rgba(var(--semi-pink-6), 1)', }}>
            <Nav
              style={{ maxWidth: 200, height: '100%' }}
              selectedKeys={[activeKey]}
              items={[
                { itemKey: 'Home', text: 'Home', icon: <IconHome size="large" /> },
                { itemKey: 'fatass', text: 'fatass', icon: <img src={fatassTetoIcon} alt="fatass" style={{ width: '24px', height: '24px' }} /> },
                { itemKey: 'meme', text: 'meme', icon: <img src={tetoPearIcon} alt='tetopear' style={{width: '24px', height:'30px'}} /> },
                { itemKey: 'techie', text: 'techie', icon: <img src={svTechieIcon} alt='svTechie' style={{width: '30px', height: '50px'}} /> },
              ]}
              onSelect={(data) => setActiveKey(String(data.itemKey))}
              footer={{
                collapseButton: true
              }}
            />
          </Sider>

          <Content style={{ background:"rgba(var(--semi-pink-2), 1)", flex: 1 }}>
            {renderPage(activeKey)}
          </Content>
        </Layout>
        <Footer style={{ ...commonStyle, background: 'rgba(var(--semi-pink-3), 1)' }}>Footer</Footer>
      </Layout>

      {/* <Button onClick={ipcHandle}>Hello Semi</Button>
      <Button onClick={darkModeToggle}>darkMode</Button> */}
    </>
  )
}

export default App
