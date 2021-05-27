import { CSSProperties, memo, ReactNode, useCallback } from 'react'
import { ByPixelsUploadPhotoSC, ByPixelsUploadPhotoSCProps } from './styled'
import { Col } from 'components/ui/Grid'
import Title from 'components/ui/Title'
import { margin, marginBottom, marginLeft, padding } from 'utils/style/indents'
import Field from 'components/ui/Field'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import Text from 'components/ui/Text'
import Area from 'components/ui/Area'
import { FormSubType } from 'hooks/useForm'
import { ByPixelsValues, supportedImageExtensions } from 'components/ByPixels/index'
import FileInput from 'components/ui/FileInput'
import cn from 'classnames'

export interface ByPixelsUploadPhotoProps extends ByPixelsUploadPhotoSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  formik: FormSubType<ByPixelsValues>
}

function ByPixelsUploadPhoto({
  className,
  style,
  formik,
  children,
  ...rest
}: ByPixelsUploadPhotoProps) {
  const onChangeLink = useCallback(
    (e) => {
      formik.setFieldValue('link', e.currentTarget.value.slice(0, 750).replace(/^https?:\/\//, ''))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik]
  )

  const onChangeTitle = useCallback(
    (e) => {
      formik.setFieldValue('title', e.currentTarget.value.slice(0, 100))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik]
  )

  return (
    <ByPixelsUploadPhotoSC className={className} style={style} {...rest}>
      <Col justify={'between'} className={'full-height'}>
        <Col align={'center'} style={padding(0, 50)}>
          <Title style={marginBottom(58)}>UPLOAD YOUR PHOTO (*OPTIONAL)</Title>
          <Area
            name='CHOOSE AN IMAGE TO UPLOAD'
            className={cn('upload-area', { uploadError: formik.errors.image })}
            style={marginBottom(26)}
          >
            <Col align={'center'}>
              <FileInput
                multiple={false}
                name={'image'}
                onValueChange={formik.setFieldValue}
                accept={`${supportedImageExtensions.map((ext) => 'image/' + ext).join(', ')}`}
              >
                <Button type={'outlined'} shadow={false} width={200} style={margin(25, 'auto', 10)}>
                  Select file
                </Button>
              </FileInput>
              <Text
                style={marginBottom(25)}
                type={'S'}
                className={'text-center'}
                color={formik.errors.image ? '#FE504F' : '#5DC499'}
              >
                {formik.values.image?.name ? `“${formik.values.image.name}”` : ' '}
                <Text type={'S'} weight={600} color={'#FE504F'}>
                  <br />
                  {formik.errors.image}
                </Text>
              </Text>
              <Text style={marginBottom(3)} type={'S'} className={'text-center'}>
                {!formik.errors.image && (
                  <>
                    For best Image Display use{' '}
                    <Text weight={600} type={'S'}>
                      X*Y px.
                    </Text>
                    <br />
                  </>
                )}
                Maximum upload file size:{' '}
                <Text weight={600} type={'S'}>
                  500KB.
                </Text>{' '}
                Image Formats:{' '}
                <Text weight={600} type={'S'}>
                  JPG, PNG or GIF (animated).
                </Text>
              </Text>
            </Col>
          </Area>
          <Field
            name='link'
            title='AdD A link'
            className={'full-width-input'}
            prefix={<Text type={'XL'}>http://</Text>}
            style={marginBottom(36)}
          >
            <Input
              placeholder='www.gizmokaka.io'
              value={formik.values.link}
              onChange={onChangeLink}
            />
          </Field>
          <Field name='title' title='ADD A TITLE' className={'full-width-input'}>
            <Input placeholder='This is art' value={formik.values.title} onChange={onChangeTitle} />
          </Field>
          <Text type={'S'} color={'#0B07424D'} style={marginLeft('auto')}>
            {formik.values.title.length} / 100
          </Text>
        </Col>
        {children}
      </Col>
    </ByPixelsUploadPhotoSC>
  )
}

export default memo(ByPixelsUploadPhoto)
