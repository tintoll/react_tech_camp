## 레이아웃

antd가 제공하는 레이아웃은 2종류가 있다. 

1. Grid

   1. 24컬럼 Grid 시스템 방식을 사용

      ```javascript
      <Row>
        // span property로 비율을 설정한다. 
        <Col span={24}>
          <Num>1</Num>
      	</Col>
      </Row>
      	// Row의 gutter property로 컬럼간의 간격을 줄 수 있다. 
      <Row gutter={16}>
          <Col span={12}>
            <Num>1</Num>
      	</Col>
        <Col span={12}>
          <Num>2</Num>
        </Col>
      </Row>
      ```

2. Flexbox

   1. Grid와 Flexbox는 원래 혼용해서 사용하지 않는다. 하지만  antd에서는 Grid안에 Flexbox를 넣는 형태로 구성되어 있다. 

      ```javascript
      <Row type="flex" justify="center" align="top">
        // offset 설정하여 왼쪽/오른쪽 정렬을 할 수가 있다.
        <Col span={12} offset={12}>
          <Num>1</Num>
      	</Col>
      </Row>
      ```

      

