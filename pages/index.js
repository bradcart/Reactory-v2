import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Typography, Paper, Grid } from '@material-ui/core';

import { Toolbox } from '../components/Toolbox';
import { SettingsPanel } from '../components/SettingsPanel';
import { Topbar } from '../components/Topbar';

import { Container } from '../components/user/Container';
import { Button } from '../components/user/Button';
import { Card } from '../components/user/Card';
import { Text } from '../components/user/Text';

import { Editor, Frame, Element } from "@craftjs/core"

export default function Home() {
  return (
    <>
      <Head>
        <title>REACTORY.v2 DEMO</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ margin: "0 auto", width: "800px" }}>
        <Typography variant="h5" align="center">A super simple page editor</Typography>
        <Editor resolver={{ Card, Button, Text, Container }}>
          <Topbar />
          <Grid container spacing={3} style={{ paddingTop: "10px" }}>
            <Grid item xs>
              <Frame>
                <Element is={Container} padding={5} background="#eee" canvas>
                  <Card />
                </Element>
              </Frame>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <Toolbox />
                <SettingsPanel />
              </Paper>
            </Grid>
          </Grid>
        </Editor>
      </div>
    </>
  )
}
