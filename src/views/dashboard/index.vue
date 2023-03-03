<template>
  <div class="w-full h-[calc(100%_-_200px)] flex justify-between gap-x-20px">
    <div class="w-200px h-full flex flex-col gap-y-10px">
      <n-scrollbar class="w-200px max-h-[calc(100vh_-_100px)]">
        <n-anchor type="block" :ignore-gap="true">
          <n-anchor-link v-for="(value, key) in result" :key="key" :title="key" :href="`#${key}`" @click="handleHref(key)" />
        </n-anchor>
      </n-scrollbar>
    </div>

    <div class="w-[calc(100%_-_550px)] flex flex-col gap-y-10px">
      <n-scrollbar style="width: 100%; max-height: calc(100vh - 130px)">
        <n-collapse :expanded-names="expandedNames">
          <n-collapse-item :id="key" v-for="(value, key) in result" :key="key" :title="value[0].categoryCN" :name="key">
            <template #header-extra>
              <n-text type="error">图标数量 ({{ value.length }})</n-text>
            </template>
            <n-grid x-gap="10" y-gap="10" cols="2 s:3 m:4 l:5 xl:5 2xl:7" responsive="screen">
              <n-gi v-for="item in value" :key="item.id">
                <div
                  class="w-226px h-70px border-1 border-[#f0f0f0] flex items-center px-5px gap-x-10px cursor-pointer text-gray-500 hover:shadow-md hover:text-shadow-md"
                >
                  <div class="w-48px h-48px flex justify-center items-center">
                    <component
                      :is="`i-${item.name}`"
                      :theme="svgIconForm.theme"
                      :size="svgIconForm.size"
                      :fill="svgIconForm.colors"
                      :strokeWidth="svgIconForm.strokeWidth"
                      :strokeLinejoin="svgIconForm.strokeLinejoin"
                      :strokeLinecap="svgIconForm.strokeLinecap"
                    />
                  </div>
                  <div class="flex flex-col justify-start items-start gap-y-10px">
                    <div class="text-sm font-bold">{{ item.title }}</div>
                    <div class="text-12px">{{ item.name }}</div>
                  </div>
                </div>
              </n-gi>
            </n-grid>
          </n-collapse-item>
        </n-collapse>
      </n-scrollbar>
    </div>
    <div class="w-240px">
      <n-form ref="formRef" :model="svgIconForm" label-placement="top" :label-width="160" class="w-full" style="width: 240px">
        <n-form-item label="图标大小" path="inputNumberValue">
          <n-slider v-model:value="svgIconForm.size" :step="1" :min="24" :max="48" />
        </n-form-item>
        <n-form-item label="线条粗细" path="sliderValue">
          <n-slider v-model:value="svgIconForm.strokeWidth" :step="1" :min="1" :max="5" />
        </n-form-item>
        <n-form-item label="图标风格" path="timePickerValue">
          <n-radio-group v-model:value="svgIconForm.theme">
            <n-radio-button v-for="option in options" :key="option.value" :value="option.value" :label="option.label" />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="线条颜色" path="colorValue">
          <n-grid x-gap="12" :y-gap="4" :cols="2">
            <n-gi>
              <n-form-item label="外部描边颜色" path="sliderValue">
                <n-color-picker v-model:value="svgIconForm.colors[0]" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="外部填充颜色" path="sliderValue">
                <n-color-picker v-model:value="svgIconForm.colors[1]" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="内部描边颜色" path="sliderValue">
                <n-color-picker v-model:value="svgIconForm.colors[2]" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="内部填充颜色" path="sliderValue">
                <n-color-picker v-model:value="svgIconForm.colors[3]" />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form-item>
        <n-form-item label="端点类型" path="timePickerValue">
          <n-space>
            <n-button ghost type="primary">
              <template #icon>
                <i-endpoint-round />
              </template>
            </n-button>
            <n-button ghost type="primary">
              <template #icon>
                <i-endpoint-flat />
              </template>
            </n-button>
            <n-button ghost type="primary">
              <template #icon>
                <i-endpoint-square />
              </template>
            </n-button>
          </n-space>
        </n-form-item>
        <n-form-item label="拐点类型" path="timePickerValue">
          <n-space>
            <n-button ghost type="primary">
              <template #icon>
                <i-node-round />
              </template>
            </n-button>
            <n-button ghost type="primary">
              <template #icon>
                <i-node-flat />
              </template>
            </n-button>
            <n-button ghost type="primary">
              <template #icon>
                <i-node-square />
              </template>
            </n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
  import { groupBy } from '@/utils/common'
  import IconJSON from '@icon-space/vue-next/icons.json'
  import { Theme } from '@icon-space/vue-next/lib/runtime'

  interface IconProps {
    id: number
    title: string
    name: string
    category: string
    categoryCN: string
    author: string
    tag: []
    rtl: boolean
  }
  const svgIconForm = reactive<{
    strokeWidth: number
    size: number
    theme: Theme
    colors: string | string[]
    strokeLinejoin: string
    strokeLinecap: string
  }>({
    strokeWidth: 2,
    size: 24,
    theme: 'multi-color',
    colors: ['#666', '#2F88FF', '#FFF', '#43CCF8'],
    strokeLinejoin: 'miter',
    strokeLinecap: 'square'
  })
  const options = [
    {
      label: '线性',
      value: 'outline'
    },
    {
      label: '填充',
      value: 'filled'
    },
    {
      label: '双色',
      value: 'two-tone'
    },
    {
      label: '多彩',
      value: 'multi-color'
    }
  ]
  const expandedNames = ref<string[]>([])
  const result = ref<Record<string, any>>()
  const values = ref<IconProps[]>([])
  const handleHref = (href: string) => {
    expandedNames.value = [href]
  }

  onMounted(() => {
    result.value = groupBy(IconJSON, 'categoryCN')
    values.value = (result.value && result.value['Clothes']) || []
  })
</script>

<style scoped></style>
