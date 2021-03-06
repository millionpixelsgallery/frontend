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
import { ByPixelsValues, ProductData, supportedImageExtensions } from 'components/ByPixels/index'
import resizeImage from 'smart-img-resize'
import FileInput from 'components/ui/FileInput'
import cn from 'classnames'
import { dataURLtoFile } from 'utils/dataUrlToFile'
import { useTheme } from 'styled-components'

export interface ByPixelsUploadPhotoProps extends ByPixelsUploadPhotoSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  formik: FormSubType<ByPixelsValues>
  title: string
  data: ProductData
}

function ByPixelsUploadPhoto({
  className,
  style,
  formik,
  children,
  title,
  data,
  ...rest
}: ByPixelsUploadPhotoProps) {
  const theme = useTheme()
  const onChangeLink = useCallback(
    (e) => {
      formik.setFieldValue('link', e.currentTarget.value.slice(0, 750))
    },

    [formik.setFieldValue]
  )

  const onChangeTitle = useCallback(
    (e) => {
      formik.setFieldValue('title', e.currentTarget.value.slice(0, 100))
    },

    [formik.setFieldValue]
  )

  const handleCrop = useCallback(
    (name, image) => {
      if (!supportedImageExtensions.includes(image.name.toLowerCase().split('.').pop()!)) {
        formik.setFieldValue(name, image)
        return
      }
      resizeImage(
        image,
        {
          outputFormat: image.name.split('.').pop(),
          targetWidth: data.width,
          targetHeight: data.height,
          crop: true,
        },
        (err: string, base64: string) => {
          if (err) {
            console.error(err)
            return
          }
          formik.setFieldValue(name, dataURLtoFile(image.name, base64))
        }
      )
    },

    [formik.setFieldValue]
  )

  return (
    <ByPixelsUploadPhotoSC className={className} style={style} {...rest}>
      <Col justify={'between'} className={'full-height'}>
        <Col align={'center'} style={padding(0, 50)}>
          <Title style={marginBottom(58)}>{title}</Title>
          <Area
            name='CHOOSE AN IMAGE TO UPLOAD'
            className={cn('upload-area', { uploadError: formik.errors.image })}
            style={marginBottom(26)}
          >
            <Col align={'center'}>
              <FileInput
                multiple={false}
                name={'image'}
                onValueChange={handleCrop}
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
                {formik.values.image?.name ? `???${formik.values.image.name}???` : ' '}
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
                      {data.width}*{data.height} px.
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
                  JPG, PNG.
                </Text>
              </Text>
            </Col>
          </Area>
          <Field
            name='link'
            title='AdD A link'
            className={'full-width-input'}
            prefix={<Text type={'XL'}>https://</Text>}
            style={marginBottom(36)}
          >
            <Input
              mainColor={theme.color.link.primaryPrimary}
              placeholder='WWW.SITE.COM'
              className={'input-text-start'}
              error={formik.getError('link')}
              value={formik.values.link}
              onChange={onChangeLink}
              onBlur={formik.handleBlur}
            />
          </Field>
          <Field name='title' title='ADD A TITLE' className={'full-width-input'}>
            <Input
              placeholder='ENTER YOUR TITLE HERE'
              value={formik.values.title}
              onChange={onChangeTitle}
              onBlur={formik.handleBlur}
              mainColor={theme.color.link.primaryPrimary}
            />
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
