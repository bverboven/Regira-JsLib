import { useFeedback } from "../../ui";
import { ref, type Ref } from "vue";
import { DEFAULT_PAGESIZE, PagingInfo, type IEntity, type IPagingInfo, type ISearchObject, type SaveResult } from "../abstractions";
import type { OverviewCoreIn, OverviewCoreOut, OverviewError } from "./overview";

export function useOverviewCore<T extends IEntity, SO extends ISearchObject = ISearchObject>({
  service,
  searchObject,
  defaultPageSize = DEFAULT_PAGESIZE,
}: OverviewCoreIn<T, SO>): OverviewCoreOut<T, SO> {
  const searchObjectRef = ref<SO>(searchObject) as Ref<SO>;
  const pagingInfo = ref<IPagingInfo>(new PagingInfo(defaultPageSize || DEFAULT_PAGESIZE));
  const itemsCount = ref<number | undefined>();
  const items = ref<Array<T> | undefined>() as Ref<Array<T>>;
  const isLoading = ref<boolean>(false);
  const feedback = useFeedback();

  async function applySave(item: T): Promise<SaveResult<T> | null> {
    isLoading.value = true;
    try {
      feedback.reset();
      const { saved, isNew } = await service.save(item);
      feedback.success(`Saved ${item.$title}`);
      return { saved, isNew };
    } catch (ex: unknown) {
      console.error("saving failed", { ex, item });
      const error = ex as OverviewError;
      feedback.fail(`Saving ${item.$title} failed`, error.response?.data?.errors);
    } finally {
      isLoading.value = false;
    }
    return null;
  }
  async function applyRemove(item: T): Promise<void> {
    isLoading.value = true;
    try {
      feedback.reset();
      await service.remove(item);
    } catch (ex) {
      console.error("removing failed", { ex, item });
      const error = ex as OverviewError;
      feedback.fail(`Removing ${item.$title} failed`, error.response?.data?.errors);
    } finally {
      isLoading.value = false;
    }
  }
  function handleSave({ saved, isNew }: SaveResult<T>) {
    if (items.value == null) {
      return;
    }

    if (!isNew) {
      const index = items.value.findIndex((x) => x.$id === saved.$id);
      if (index !== -1) {
        items.value.splice(index, 1, saved);
      }
    } else {
      items.value.push(saved);
    }
  }
  function handleRemove(item: T): void {
    if (items.value == null) {
      return;
    }

    const index = items.value.findIndex((x) => x.$id === item.$id);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }
  function resetPage() {
    pagingInfo.value = {
      ...pagingInfo?.value,
      page: 1,
    };
  }

  return {
    searchObject: searchObjectRef,
    pagingInfo,
    items,
    itemsCount,

    isLoading,
    feedback,

    applySave,
    applyRemove,
    handleSave,
    handleRemove,

    resetPage,
  };
}

export default useOverviewCore;
