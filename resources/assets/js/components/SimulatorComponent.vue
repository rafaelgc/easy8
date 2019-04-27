<template>
  <div class="main-layout">
    <div class="button-area">
      <button class="btn" v-on:click="assembly()">Ensamblar</button>
      <button class="btn" v-on:click="runStep">Ejecutar paso</button>
      <div style="clear: both"></div>
    </div>

    <div class="editor-and-registers">
      <div v-if="view == 'editor'" class="editor-container">
        <codemirror v-model="$store.state.simulator.content" :options="cmOptions"></codemirror>
      </div>
      <div v-else class="simulator-container">
        <svg
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          width="133.04761mm"
          height="123.40923mm"
          viewBox="0 0 133.04761 123.40923"
          version="1.1"
          id="svg8"
          inkscape:version="0.92.1 r15371"
          sodipodi:docname="simulator.svg">
          <defs
            id="defs2" />
          <sodipodi:namedview
            id="base"
            pagecolor="#ffffff"
            bordercolor="#666666"
            borderopacity="1.0"
            inkscape:pageopacity="0.0"
            inkscape:pageshadow="2"
            inkscape:zoom="1"
            inkscape:cx="538.43342"
            inkscape:cy="-127.04351"
            inkscape:document-units="mm"
            inkscape:current-layer="layer1"
            showgrid="false"
            inkscape:measure-start="0,0"
            inkscape:measure-end="0,0"
            inkscape:window-width="1715"
            inkscape:window-height="1028"
            inkscape:window-x="75"
            inkscape:window-y="1"
            inkscape:window-maximized="0" />
          <metadata
            id="metadata5">
            <rdf:RDF>
              <cc:Work
                rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type
                  rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                <dc:title />
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <g
            inkscape:label="Layer 1"
            inkscape:groupmode="layer"
            id="layer1"
            transform="translate(-23.056545,-100.64137)">
            <rect
              style="fill:#ffe680;fill-opacity:1;stroke-width:0.35023394"
              id="rect4485"
              width="133.04761"
              height="123.40923"
              x="23.056545"
              y="100.64137" />
            <g
              id="g4629"
              transform="matrix(0.88693097,0,0,0.88693097,17.752338,25.400786)">
              <rect
                y="167.73215"
                x="100.84404"
                height="52.236305"
                width="51.48035"
                id="rect4487"
                style="fill:#333333;fill-opacity:1;stroke-width:0.25121015" />
              <rect
                y="174.04433"
                x="106.32471"
                height="7.3705339"
                width="7.6246915"
                id="rect4489"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="174.04433"
                x="117.12439"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="174.04433"
                x="127.92408"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="174.04433"
                x="138.72368"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6-7"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="185.11897"
                x="106.32471"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-5"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="185.11897"
                x="117.1244"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-3"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="185.11897"
                x="127.92408"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6-5"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="185.11897"
                x="138.72366"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6-7-6"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="196.19362"
                x="106.32469"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-5-2"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="196.19362"
                x="117.12439"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-3-9"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="196.19362"
                x="127.92407"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6-5-1"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="196.19362"
                x="138.72366"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6-7-6-2"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="206.73911"
                x="106.32469"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-5-2-7"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="206.73911"
                x="117.1244"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-3-9-0"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="206.73911"
                x="127.92409"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6-5-1-9"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
              <rect
                y="206.73911"
                x="138.72366"
                height="7.3705339"
                width="7.6246915"
                id="rect4489-3-6-7-6-2-3"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.17790946" />
            </g>
            <rect
              style="fill:#c83737;fill-opacity:1;stroke-width:0.26815629"
              id="rect4610"
              width="42.597916"
              height="61.647915"
              x="64.86071"
              y="103.70296" />
            <circle
              style="fill:#008000;fill-opacity:1;stroke-width:0.26458332"
              id="path4631"
              cx="71.305214"
              cy="214.05313"
              r="4.1010418" />
            <rect
              style="fill:#666666;fill-opacity:1;stroke-width:0.23512554"
              id="rect4648"
              width="29.633333"
              height="19.314583"
              x="116.15208"
              y="136.66251" />
            <rect
              style="fill:#666666;fill-opacity:1;stroke-width:0.23512554"
              id="rect4648-1"
              width="29.633333"
              height="19.314583"
              x="28.310406"
              y="103.7219" />
            <rect
              style="fill:#666666;fill-opacity:1;stroke-width:0.16046408"
              id="rect4648-1-9"
              width="29.633333"
              height="8.9958324"
              x="28.310406"
              y="135.73637"
              inkscape:transform-center-x="-12.964583"
              inkscape:transform-center-y="-5.0524545" />
            <path
              style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.26458332"
              d="m 30.504219,183.40157 0.35595,0.0351 c -0.43308,1.06093 -0.433483,2.08392 -0.496954,3.11653 l -0.332564,0.006 c 0.07581,-1.05054 0.006,-2.10693 0.473568,-3.15746 z"
              id="rect4682"
              inkscape:connector-curvature="0"
              sodipodi:nodetypes="ccccc" />
            <rect
              style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.25666961"
              id="rect4682-6"
              width="0.3734889"
              height="3.175"
              x="31.14476"
              y="183.39316" />
            <path
              style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.26458332"
              d="m 32.173061,183.44862 -0.35595,0.0351 c 0.43308,1.06093 0.433483,2.08392 0.496954,3.11653 l 0.332564,0.006 c -0.07581,-1.05054 -0.006,-2.10693 -0.473568,-3.15746 z"
              id="rect4682-5"
              inkscape:connector-curvature="0"
              sodipodi:nodetypes="ccccc" />
            <rect
              style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.24669017"
              id="rect4680"
              width="3.4395833"
              height="5.0601563"
              x="29.645016"
              y="178.75963" />
            <rect
              style="fill:#333333;fill-opacity:1;stroke-width:0.26458332"
              id="rect5067"
              width="11.973675"
              height="11.973675"
              x="83.067368"
              y="142.09058" />
            <rect
              style="fill:#333333;fill-opacity:1;stroke-width:0.10014993"
              id="rect5067-7"
              width="4.5322685"
              height="4.5322685"
              x="-17.411228"
              y="149.17244"
              transform="rotate(-45)" />
            <rect
              style="fill:#333333;fill-opacity:1;stroke-width:0.10748697"
              id="rect5067-4"
              width="4.8643055"
              height="4.8643055"
              x="74.648384"
              y="108.97588" />
            <rect
              style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.19299382"
              id="rect5099"
              width="1.6497513"
              height="5.5539689"
              x="102.90755"
              y="158.63579" />
            <rect
              style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916"
              id="rect5101"
              width="0.41341144"
              height="0.41341144"
              x="103.56783"
              y="159.41667" />
            <rect
              style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916"
              id="rect5101-8"
              width="0.41341147"
              height="0.41341147"
              x="103.55957"
              y="161.22742" />
            <rect
              style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916"
              id="rect5101-8-5"
              width="0.41341147"
              height="0.41341147"
              x="103.54303"
              y="162.98027" />
            <g
              id="g5184"
              transform="matrix(1.3403866,0,0,1.2201733,-32.233202,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <g
              id="g5184-9"
              transform="matrix(1.3403866,0,0,1.2201733,-33.730713,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8-60"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-7"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6-0"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <g
              id="g5184-0"
              transform="matrix(1.3403866,0,0,1.2201733,-29.238179,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8-1"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-3"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6-7"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <g
              id="g5184-9-7"
              transform="matrix(1.3403866,0,0,1.2201733,-30.735691,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8-60-2"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-7-6"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6-0-4"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <g
              id="g5184-5"
              transform="matrix(1.3403866,0,0,1.2201733,-26.237615,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8-2"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-0"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6-2"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <g
              id="g5184-9-9"
              transform="matrix(1.3403866,0,0,1.2201733,-27.735127,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8-60-0"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-7-9"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6-0-9"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <g
              id="g5184-0-4"
              transform="matrix(1.3403866,0,0,1.2201733,-23.242593,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8-1-5"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-3-1"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6-7-0"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <g
              id="g5184-9-7-3"
              transform="matrix(1.3403866,0,0,1.2201733,-24.740105,-28.007422)">
              <rect
                y="122.88427"
                x="91.363052"
                height="2.5492013"
                width="1.1068854"
                id="rect5099-8-60-2-7"
                style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.10709912" />
              <rect
                y="123.25626"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-7-6-8"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
              <rect
                y="124.64877"
                x="91.702927"
                height="0.41341147"
                width="0.41341147"
                id="rect5101-2-6-0-4-8"
                style="fill:#f9f9f9;fill-opacity:1;stroke-width:0.33072916" />
            </g>
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0"
              width="0.85533428"
              height="1.4908681"
              x="116.38586"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0-4"
              width="0.85533428"
              height="1.4908681"
              x="117.77036"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0-4-8"
              width="0.85533428"
              height="1.4908681"
              x="119.15485"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0-4-8-7"
              width="0.85533428"
              height="1.4908681"
              x="120.53934"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0-4-8-7-1"
              width="0.85533428"
              height="1.4908681"
              x="121.92384"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0-4-8-7-1-7"
              width="0.85533428"
              height="1.4908681"
              x="123.30833"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0-4-8-7-1-7-2"
              width="0.85533428"
              height="1.4908681"
              x="124.69283"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.02495299"
              id="rect5067-6-0-4-8-7-1-7-2-7"
              width="0.85533428"
              height="1.4908681"
              x="126.07732"
              y="111.11239" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-2"
              width="0.85533428"
              height="0.29817787"
              x="116.48575"
              y="106.40926" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-4-2"
              width="0.85533428"
              height="0.29817787"
              x="117.87025"
              y="106.40926" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-4-8-6"
              width="0.85533428"
              height="0.29817787"
              x="119.25474"
              y="106.40926" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-4-8-7-10"
              width="0.85533428"
              height="0.29817787"
              x="120.63923"
              y="106.40926" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-4-8-7-1-7-2-7-9"
              width="0.85533428"
              height="0.29817787"
              x="126.17721"
              y="106.40926" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.32871681"
              id="rect4761"
              width="0.18708867"
              height="24.040894"
              x="124.83191"
              y="112.60326" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.31773239"
              id="rect4761-4"
              width="0.18708867"
              height="22.461033"
              x="123.66107"
              y="112.59592" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.11316839"
              id="rect4761-4-9"
              width="0.18708867"
              height="2.8494229"
              x="182.95767"
              y="6.0616488"
              transform="rotate(45.5833)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.33554229"
              id="rect4761-4-0"
              width="0.18708867"
              height="25.049618"
              x="124.34306"
              y="111.59856" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.15549506"
              id="rect4761-4-0-9"
              width="0.18708862"
              height="5.3794742"
              x="-117.57489"
              y="118.28559"
              transform="matrix(-1.5803582e-4,-0.99999999,0.99999413,-0.00342674,0,0)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.15549506"
              id="rect4761-4-0-9-1"
              width="0.18708862"
              height="5.3794742"
              x="-166.22234"
              y="0.89971733"
              transform="matrix(-0.71001689,-0.70418465,0.70186005,-0.71231486,0,0)" />
            <g
              id="g4848"
              transform="translate(0.28318684,0.48782551)">
              <circle
                r="0.17363282"
                cy="116.58724"
                cx="117.95456"
                id="path4829"
                style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.26458332" />
              <circle
                r="0.10852052"
                cy="116.59034"
                cx="117.95352"
                id="path4829-7"
                style="fill:#504416;fill-opacity:0.71063831;stroke-width:0.16536458" />
            </g>
            <g
              id="g4848-7"
              transform="translate(0.60357595,-0.21497231)">
              <circle
                r="0.17363282"
                cy="1<img src="images/simulator.svg">16.58724"
              cx="117.95456"
              id="path4829-1"
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.26458332" />
              <circle
                r="0.10852052"
                cy="116.59034"
                cx="117.95352"
                id="path4829-7-1"
                style="fill:#504416;fill-opacity:0.71063831;stroke-width:0.16536458" />
            </g>
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.33559337"
              id="rect4761-4-5"
              width="0.18708867"
              height="25.057257"
              x="117.39828"
              y="111.58368" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.2942991"
              id="rect4761-9"
              width="0.18708867"
              height="19.270124"
              x="103.95908"
              y="-126.70905"
              transform="rotate(90)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.26861814"
              id="rect4761-9-7"
              width="0.18708867"
              height="16.053783"
              x="104.55437"
              y="-123.50924"
              transform="rotate(90)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.26064876"
              id="rect4761-9-7-7"
              width="0.18708867"
              height="15.115339"
              x="105.21073"
              y="-122.60748"
              transform="rotate(90)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.25586918"
              id="rect4761-9-7-7-6"
              width="0.18708867"
              height="14.566075"
              x="105.90647"
              y="-121.99159"
              transform="rotate(90)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.10446013"
              id="rect4761-4-0-9-3"
              width="0.18708862"
              height="2.4277711"
              x="125.70164"
              y="103.99255"
              transform="matrix(1,-7.132035e-5,0.007593,0.99997117,0,0)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.11067849"
              id="rect4761-4-0-9-3-6"
              width="0.18708862"
              height="2.7254181"
              x="11.498443"
              y="161.29468"
              transform="matrix(0.70436053,-0.70984241,0.71453428,0.69960043,0,0)" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-4-8-7-1-7-2-5"
              width="0.85533428"
              height="0.29817787"
              x="124.79272"
              y="106.40926" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.11067849"
              id="rect4761-4-0-9-3-6-5"
              width="0.18708862"
              height="2.7254181"
              x="10.41793"
              y="161.12468"
              transform="matrix(0.70436053,-0.70984241,0.71453428,0.69960043,0,0)" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-4-8-7-1-7-1"
              width="0.85533428"
              height="0.29817787"
              x="123.40822"
              y="106.40926" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.07750317"
              id="rect4761-4-0-9-6"
              width="0.18708862"
              height="1.3364279"
              x="6.201838"
              y="161.32738"
              transform="matrix(0.69487591,-0.71912966,0.72861915,0.68491907,0,0)" />
            <rect
              style="fill:#333333;fill-opacity:1;stroke-width:0.16625239"
              id="rect5067-6"
              width="11.637104"
              height="4.8643055"
              x="115.86316"
              y="106.73083" />
            <rect
              style="fill:#cccccc;fill-opacity:1;stroke-width:0.01115939"
              id="rect5067-6-0-4-8-7-1-6"
              width="0.85533428"
              height="0.29817787"
              x="122.02374"
              y="106.40926" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.38292697"
              id="rect4761-4-0-9-39"
              width="0.18708871"
              height="32.624084"
              x="66.354774"
              y="165.41463"
              transform="matrix(0.99999954,-9.5841981e-4,5.6504449e-4,0.99999984,0,0)" />
            <path
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.40050295"
              d="m 64.812401,154.61077 -12.322762,12.33568 v 0.2651 l 12.455569,-12.46849 z"
              id="rect4761-4-0-9-39-4"
              inkscape:connector-curvature="0" />
            <path
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:1.51371193"
              d="M 256.30273,745.75195 204.875,797.23242 v 1.00196 l 51.92773,-51.98243 z"
              id="rect4761-4-0-9-39-4-8"
              transform="scale(0.26458333)"
              inkscape:connector-curvature="0" />
            <path
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:1.51371193"
              d="M 260.98633,744.60352 205,800.64844 v 1 l 56.48828,-56.54492 z"
              id="rect4761-4-0-9-39-4-8-1"
              transform="scale(0.26458333)"
              inkscape:connector-curvature="0" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.37989554"
              id="rect4761-4-0-9-39-2"
              width="0.18708871"
              height="32.1096"
              x="67.645332"
              y="165.40019"
              transform="matrix(0.99999956,-9.4330528e-4,5.7409719e-4,0.99999984,0,0)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.37809283"
              id="rect4761-4-0-9-39-2-9"
              width="0.18708871"
              height="31.805582"
              x="68.883911"
              y="165.40073"
              transform="matrix(0.99999956,-9.3437384e-4,5.7958611e-4,0.99999983,0,0)" />
            <path
              inkscape:connector-curvature="0"
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.40050295"
              d="m 66.520926,197.84261 -14.81305,14.82855 v 0.26459 L 66.653733,197.9749 Z"
              id="rect4761-4-0-9-39-4-8-1-3" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.4277868"
              id="rect4761-4-0-9-39-0"
              width="0.18708876"
              height="40.715622"
              x="52.414062"
              y="167.0092"
              transform="matrix(0.99999928,-0.00119613,4.5275122e-4,0.9999999,0,0)" />
            <rect
              style="fill:#c83737;fill-opacity:1;stroke-width:0.08671817"
              id="rect4610-4"
              width="25.523891"
              height="10.759797"
              x="30.711691"
              y="207.61729" />
            <g
              id="g4770-2-4-8"
              transform="matrix(0.8909091,0,0,0.83837577,11.792982,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749-2-1-8"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4-6-2-9"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <g
              id="g4770"
              transform="matrix(0.89090909,0,0,0.83837577,3.3299775,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <g
              id="g4770-2"
              transform="matrix(0.8909091,0,0,0.83837577,6.1509788,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749-2"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4-6"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <g
              id="g4770-2-4"
              transform="matrix(0.8909091,0,0,0.83837577,8.9719805,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749-2-1"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4-6-2"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <g
              id="g4770-28"
              transform="matrix(0.8909091,0,0,0.83837577,14.613984,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749-8"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4-8"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <g
              id="g4770-2-6"
              transform="matrix(0.8909091,0,0,0.83837577,17.434984,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749-2-8"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4-6-3"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <g
              id="g4770-2-4-83"
              transform="matrix(0.8909091,0,0,0.83837577,20.255986,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749-2-1-3"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4-6-2-3"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <g
              id="g4770-2-4-8-8"
              transform="matrix(0.8909091,0,0,0.83837577,23.076987,34.374477)">
              <rect
                y="209.81667"
                x="32.646973"
                height="6.5481033"
                width="2.5724692"
                id="rect4749-2-1-8-0"
                style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.27457109" />
              <rect
                y="213.1375"
                x="32.646973"
                height="3.2272794"
                width="2.5724692"
                id="rect4749-4-6-2-9-4"
                style="fill:#ffffff;fill-opacity:1;stroke-width:0.19275929" />
            </g>
            <path
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.40050295"
              d="m 67.834237,154.59261 -12.322762,12.33568 v 0.2651 L 67.967044,154.7249 Z"
              id="rect4761-4-0-9-39-4-88"
              inkscape:connector-curvature="0" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.22948579"
              id="rect4761-4-0-9-39-0-5"
              width="0.18708864"
              height="11.717049"
              x="55.061741"
              y="166.94751"
              transform="matrix(0.99999994,-3.442194e-4,0.00157327,0.99999876,0,0)" />
            <g
              id="g4848-5"
              transform="translate(-62.506156,62.190262)">
              <circle
                r="0.17363282"
                cy="116.58724"
                cx="117.95456"
                id="path4829-6"
                style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.26458332" />
              <circle
                r="0.10852052"
                cy="116.59034"
                cx="117.95352"
                id="path4829-7-11"
                style="fill:#504416;fill-opacity:0.71063831;stroke-width:0.16536458" />
            </g>
            <g
              id="g5284"
              transform="translate(-1.4513948,-1.0845927)">
              <rect
                y="179.22769"
                x="57.706238"
                height="1.2160763"
                width="3.9205935"
                id="rect5195"
                style="fill:#504416;fill-opacity:0.71063831;stroke-width:0.26430476" />
              <rect
                y="179.21172"
                x="58.200222"
                height="1.2217506"
                width="0.37417734"
                id="rect5197"
                style="fill:#0000ff;fill-opacity:0.71063831;stroke-width:0.27602881" />
              <rect
                y="179.21172"
                x="58.756298"
                height="1.2217506"
                width="0.37417734"
                id="rect5197-0"
                style="fill:#0000ff;fill-opacity:0.71063831;stroke-width:0.27602881" />
              <rect
                y="179.22006"
                x="59.368965"
                height="1.2217506"
                width="0.37417734"
                id="rect5197-0-9"
                style="fill:#0000ff;fill-opacity:0.71063831;stroke-width:0.27602881" />
              <rect
                y="179.22005"
                x="60.005615"
                height="1.2217506"
                width="0.37417734"
                id="rect5197-0-9-6"
                style="fill:#000000;fill-opacity:0.71063831;stroke-width:0.27602881" />
              <rect
                y="179.2244"
                x="60.818329"
                height="1.2217506"
                width="0.37417734"
                id="rect5197-0-9-6-3"
                style="fill:#ffd42a;fill-opacity:0.71063831;stroke-width:0.27602881" />
              <rect
                y="179.7299"
                x="56.981308"
                height="0.28063297"
                width="0.72942591"
                id="rect5259"
                style="fill:#c8beb7;fill-opacity:0.71063831;stroke-width:0.19572076" />
              <rect
                y="179.69061"
                x="61.613934"
                height="0.280633"
                width="0.72942591"
                id="rect5259-8"
                style="fill:#c8beb7;fill-opacity:0.71063831;stroke-width:0.19572076" />
            </g>
            <g
              id="g4848-59"
              transform="translate(-57.010427,62.149336)">
              <circle
                r="0.17363282"
                cy="116.58724"
                cx="117.95456"
                id="path4829-8"
                style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.26458332" />
              <circle
                r="0.10852052"
                cy="116.59034"
                cx="117.95352"
                id="path4829-7-4"
                style="fill:#504416;fill-opacity:0.71063831;stroke-width:0.16536458" />
            </g>
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.44654104"
              id="rect4761-4-0-9-39-2-8"
              width="0.18708879"
              height="44.363831"
              x="96.120712"
              y="165.54343"
              transform="matrix(0.99999915,-0.00130331,4.1552011e-4,0.99999991,0,0)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.44442204"
              id="rect4761-4-0-9-39-2-9-1"
              width="0.18708879"
              height="43.94379"
              x="97.35955"
              y="165.54379"
              transform="matrix(0.99999917,-0.00129096,4.1949183e-4,0.99999991,0,0)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.11826175"
              id="rect4761-4-0-9-39-2-8-0"
              width="0.18708862"
              height="3.1116827"
              x="215.8374"
              y="80.197716"
              transform="matrix(0.70717142,0.70704214,-0.70290537,0.71128338,0,0)" />
            <rect
              style="fill:#ffffff;fill-opacity:0.71063831;stroke-width:0.11826175"
              id="rect4761-4-0-9-39-2-8-0-3"
              width="0.18708862"
              height="3.1116827"
              x="216.42377"
              y="79.024246"
              transform="matrix(0.70717143,0.70704213,-0.70290537,0.71128338,0,0)" />
            <circle
              style="fill:#aa0000;fill-opacity:1;stroke-width:0.26458332; cursor: pointer"
              id="path4631-9"
              cx="92.868752"
              cy="213.92082"
              r="4.1010418" />
          </g>
        </svg>
      </div>

      <div class="registers" v-if="registers">

        <div class="register">
          <h2>RA</h2>
          <div class="value">{{ registers.ra | toHex }}</div>
        </div>

        <div class="register">
          <h2>PC</h2>
          <div class="value">{{ registers.pc | toHex }}</div>
        </div>

        <div class="register">
          <h2>RET</h2>
          <div class="value">{{ registers.ret | toHex }}</div>
        </div>

        <div class="register">
          <h2>SP</h2>
          <div class="value">{{ registers.sp | toHex }}</div>
        </div>
      </div>
    </div>

    <div class="editor-and-registers">
      <div class="memory-displays">
        <div class="memory code">
          <h2>Memoria de código</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in memory" ref="codeMemory" class="entry" :class="{ highlight: index == registers.pc }">
             <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

        <div class="memory data">
          <h2>Memoria de datos</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in memory" ref="dataMemory" class="entry" :class="{ highlight: index == lastModifiedMemoryAddress }">
              <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

        <div class="memory heap">
          <h2>Memoria de pila</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in memory" ref="stackMemory" class="entry" :class="{ highlight: index == registers.sp }">
              <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

        <div class="memory heap">
          <h2>Puertos</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in ports" class="entry" :class="{ highlight: index == lastModifiedPort }">
              <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';

import RuntimeEnvironment from '../runtime-environment';
import Assembler from '../assembler';

import instructionSet from '../instruction-set';

import HexKeyboard from './HexKeyboard.vue';
Vue.component('HexKeyboard', HexKeyboard);

import Leds from './Leds.vue';
Vue.component('Leds', Leds);

import Switches from './Switches.vue';
Vue.component('Switches', Switches);

import Temperature from './Temperature.vue';
Vue.component('Temperature', Temperature);

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import { IODevices } from '../io';

export default {
  components: {
    codemirror: codemirror
  },
  filters: {
    toHex(value) {
      var hex = value.toString(16).toUpperCase();
      return '0x' + (hex.length < 2 ? '0' : '') + hex;
    }
  },
  data: function () {
    return {
      leds: 10,

      assembler: null,

      memory: null,
      registers: null,
      ports: null,

      lastModifiedMemoryAddress: -1,
      lastModifiedPort: -1,

      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
      }
    }
  },
  computed: {
    view() {
      return this.$store.state.simulator.view;
    }
  },
  methods: {
    assembly: function () {
      console.log('assembly');
      if (this.assembler.assembly(this.$store.state.simulator.content)) {
        this.$toasted.success('¡Hecho!', { duration: 5000 });
      }

      this.runtimeEnvironment.resetProgram();
    },

    runStep() {
      this.runtimeEnvironment.runStep();

      this.$refs.codeMemory[Math.max(this.runtimeEnvironment.getRegisters().get('PC') - 4, 0)].scrollIntoView();
    },

    onSyntaxError: function (message, line) {
      alert('Error en la línea ' + line + ': ' + message);
    },

    onMemoryUpdate: function (memory, address, value) {
      // Scroll hacia la dirección modificada sólo cuando estamos ejecutando.
      // Esto es así para evitar mover el scroll cuando ensamblamos.
      if (!this.assembler.isAssembling()) {
        this.lastModifiedMemoryAddress = address;
        this.$refs.dataMemory[Math.max(address - 4, 0)].scrollIntoView();
      }
    },

    onPortUpdate: function (io, address, value) {
      console.log('UPATED');
      this.lastModifiedPort = address;
      this.$refs.ports[Math.max(address - 4, 0)].scrollIntoView();
    },

    onRegisterUpdate: function (register, value) {
      console.log(register);
      if (register == 'SP') {
        this.$refs.stackMemory[Math.max(value - 4, 0)].scrollIntoView();
      }
    },
  },
  created: function() {},
  mounted: function() {
    var self = this;
    var regex = /(?:MOVEI|MOVE|COMPAREI|COMPARE|JUMP|JLESS|JEQUAL|JGREATER|ADDI|ADD|INC|SUBI|SUB|DEC|CALL|RET|PUSH|POP|STOP|IN|OUT)\b/;

    this.$store.dispatch('loadSource', this.$route.params.entryId).then(function (response) {
      self.$store.state.simulator.entry = response.body;

      self.$store.state.simulator.content = response.body.source.content;
    });

    this.runtimeEnvironment = new RuntimeEnvironment(instructionSet);
    this.runtimeEnvironment.setCallbacks({
      onMemoryUpdate: this.onMemoryUpdate,
      onRegisterUpdate: this.onRegisterUpdate,
      onPortUpdate: this.onPortUpdate
    });

    this.memory = this.runtimeEnvironment.getMemory().getData();
    this.registers = this.runtimeEnvironment.getRegisters().getData();
    this.ports = this.runtimeEnvironment.getIo().getData();

    this.assembler = new Assembler(this.runtimeEnvironment.getMemory(), instructionSet);
    this.assembler.setOnSyntaxError(this.onSyntaxError);

    // Para poder manipular los puertos desde la consola del navegador.
    window.easy8 = {
      io: this.runtimeEnvironment.getIo(),
      IODevices: IODevices
    };
  }
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .main-layout {
    display: flex;
    flex-direction: column;
    /*height: 100%;
    max-height: 100%;*/
    height: calc(100vh - 40px);

    overflow-y: auto;
  }

  .button-area {
    padding: 15px;
  }

  .button-area .right {
    float: right;
  }

  .editor-and-registers {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-basis: 40%;
    padding-bottom: 10px;
  }

  .editor-container {
    padding: 0 10px 10px 10px;
    width: 50%;
  }

  .editor-container .vue-codemirror {
    border: solid 1px #d6d6d6;
    height: 100%;
  }

  .editor-container .vue-codemirror >>> .CodeMirror {
    height: 100%;
  }

  .simulator-container {
    padding: 10px 0;
  }

  .simulator-container svg {
    max-height: 100%;
  }

  .registers {
    display: flex;
    justify-content: center;
    width: 50%;
    align-items: flex-start;
  }

  .registers .register {
    padding: 13px 25px;
    border: solid 1px #cbcbcb;
    margin: 0 5px;
    min-width: 75px;
    background-color: white;
  }

  .registers .register h2 {
    font-size: 80%;
    margin: 0 0 5px 0;
    padding: 0;
    text-align: center;
    color: #525252;
  }

  .registers .register .value {
    text-align: center;
    font-size: 110%;
    font-family: monospace;
  }

  .memory-displays {
    width: 100%;
    display: flex;
    /*max-height: 100%;*/
    overflow-y: hidden;
  }

  .memory-displays .memory {
    flex-grow: 1;
    border: solid 1px #cbcbcb;
    background-color: white;
    margin: 10px;
    flex-basis: 25%;
    /*overflow-y: auto;*/
    display: flex;
    flex-direction: column;
  }

  .memory-displays .memory h2 {
    padding: 10px 0;
    margin: 0;
    font-size: 80%;
    text-align: center;
    color: #4c4c4c;
  }

  .memory-displays .memory .scroll {
    overflow-y: scroll;
  }

  .memory-displays .memory .entry {
    font-family: monospace;
    padding: 3px 10px;
    font-size: 12px;
  }

  .memory-displays .memory .entry .address {
    color: #6b6b6b;
    margin-right: 10px;
  }

  .memory-displays .memory .entry:nth-child(even) {
    background-color: #fcfcfc;
  }

  .memory-displays .memory .entry:hover {
    background-color: #eeeeee;
  }

  .memory-displays .memory .entry.highlight {
    background-color: #dfdfdf;
  }

</style>
