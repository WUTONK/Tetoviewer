// 仅用于练习 Notification 的最小示例
import React from 'react'
import { Button, Layout, Notification } from '@douyinfe/semi-ui'

function Noti(): React.JSX.Element {
  const { Header, Content } = Layout

  // hook 版本，需渲染 holder
  const [api, holder] = Notification.useNotification() as [
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

  return (
    <Layout style={{ padding: 24 }}>
      <Header style={{ background: 'transparent' }}>Notification 练习</Header>
      <Content style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* 官网最简：静态 API */}
        <Button onClick={() => Notification.open({ title: '静态 open', content: '来自 Notification.open', duration: 2 })}>
          静态 open
        </Button>

        {/* hook 版本：更稳，需渲染 holder */}
        {holder}
        <Button onClick={() => api.open({ title: 'hook open', content: '来自 useNotification', duration: 2 })}>
          hook open
        </Button>

        <Button onClick={() => api.success({ title: '成功', content: '操作成功', duration: 2 })}>success</Button>
        <Button onClick={() => api.info({ title: '信息', content: '一些提示信息', duration: 2 })}>info</Button>
        <Button onClick={() => api.warning({ title: '警告', content: '注意风险', duration: 2 })}>warning</Button>
        <Button onClick={() => api.error({ title: '错误', content: '出错了', duration: 2 })}>error</Button>
      </Content>
    </Layout>
  )
}

export default Noti
