'use client';

import { getTdee } from '@api';
import BodyIndex from '@components/common/BodyIndex';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { ModeToggle } from '@components/ui/mode-toggle';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Skeleton } from '@components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { ActivityLevel, ExpectedBodyEnum, MaleEnum, SpeedChangeWeightEnum } from '@lib/commonTypes';
import { foodData } from '@lib/constant';
import { caculateCarb, caculateFat, caculateProtein } from '@lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React from 'react';

export default function Home() {
  const [gender, setGender] = React.useState<MaleEnum>(MaleEnum.Male);
  const [age, setAge] = React.useState<number>(23);
  const [isLoadingTdee, setIsLoadingTdee] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number>(160);
  const [weight, setWeight] = React.useState<number>(59.3);
  const [levelExercise, setLevelExercise] = React.useState<ActivityLevel>(ActivityLevel.VeryActive);
  const [expectedWeight, setExpectedWeight] = React.useState<number>(55);
  const [expectedBody] = React.useState<ExpectedBodyEnum>(ExpectedBodyEnum.ReduceFat);
  const [speedChangeWeight] = React.useState<SpeedChangeWeightEnum>(SpeedChangeWeightEnum.Normal);
  const [yourTdee, setYourTdee] = React.useState<number>(0);
  const [protein, setProtein] = React.useState<number>(0);
  const [fat, setFat] = React.useState<number>(0);
  const [carb, setCarb] = React.useState<number>(0);

  const listActivityLevel = [
    ActivityLevel.Sedentary,
    ActivityLevel.LightlyActive,
    ActivityLevel.Active,
    ActivityLevel.VeryActive
  ];
  const handleChangeAge = (e: A) => {
    if (Number(e.target.value) > 99) {
      setAge(99);
    } else {
      setAge(Number(e.target.value));
    }
  };
  const handleChangeHeight = (e: A) => {
    if (Number(e.target.value) > 200) {
      setHeight(200);
    } else {
      setHeight(Number(e.target.value));
    }
  };
  const handleChangeWeight = (e: A) => {
    setWeight(Number(e.target.value));
  };
  const renderExerciseIntensity = () => {
    switch (levelExercise) {
      case ActivityLevel.Sedentary:
        return 'Ít hoạt động, chỉ ăn đi làm về ngủ';
      case ActivityLevel.LightlyActive:
        return 'Có tập nhẹ nhàng, tuần 1-3';
      case ActivityLevel.Active:
        return 'Có vận động vừa 4-5 buổi';
      case ActivityLevel.VeryActive:
        return 'Vận động nhiều 6-7 buổi';
      default:
        break;
    }
  };
  const caculateTdee = async () => {
    setIsLoadingTdee(true);
    const params = {
      activityLevel: levelExercise,
      gender: gender,
      age: age.toString(),
      weight: weight.toString(),
      height: height.toString()
    };
    const { result } = await getTdee(params);
    if (result) {
      setIsLoadingTdee(false);
      setYourTdee(result);
      setProtein(caculateProtein(weight));
      const fatIn = caculateFat(result - 500, caculateProtein(weight));
      setFat(fatIn);
      setCarb(caculateCarb(fatIn));
    }
  };
  return (
    <main className='flex flex-row min-h-screen justify-between p-12 relative'>
      <div className='absolute right-0'>
        <ModeToggle />
      </div>
      <aside className='flex-[2_2_0%] border-4 border-green-300 rounded-lg p-5 box-content'>
        <h2 className='text-3xl font-bold text-green-500'>TDEE là gì? Tính TDEE giảm cân lành mạnh</h2>
        <div>
          <p>
            TDEE (Total Daily Energy Expenditure) là tất cả năng lượng cần thiết cho hoạt động mỗi ngày của bạn. Tính
            TDEE giúp bạn đạt được mục tiêu dinh dưỡng (giảm cân, tăng cân) của bạn. Xác định chỉ số TDEE sẽ giúp bạn
            biết rõ lượng calo nên tăng hoặc giảm để đạt hiệu quả cutting (giảm cân) hay bulking (tăng cân). Nói cách
            khác, TDEE giúp cân bằng năng lượng để đạt được hiệu quả giảm cân nhưng không gây ra những tác động tiêu cực
            đến sức khỏe.
          </p>
          <br />
          <p>
            Tính TDEE giảm cân giúp chúng ta phân biệt được một cách tương đối năng lượng của thực phẩm hay năng lượng
            cần thiết để duy trì hoạt động. Từ đó xây dựng cho mình một chế độ ăn phù hợp với bản thân.
          </p>
          <br />
          <p>
            Tại sao bạn cần phải tính calo? Chúng ta thường không để ý xem mình đã ăn bao nhiêu trong một bữa dù việc
            này rất cần thiết, đặc biệt đối với những bạn muốn giảm cân.
          </p>
          <br />
          Chúng ta vẫn luôn nghĩ rằng chỉ cần ăn ít hơn bình thường là đã có thể giảm được cân rồi. Điều này không sai,
          nhưng có thể dẫn đến việc thiếu những chất cần thiết dành cho cơ thể.
          <p>
            Vì thế khi ăn, đặc biệt là khi giảm cân, bạn nên tính cho mình một lượng calo cần thiết nạp vào cơ thể trong
            một ngày. Việc này không chỉ giúp bạn kiểm soát được lượng ăn mà còn có thể chia khẩu phần ăn sao cho đủ
            chất. Bạn cũng có thể chia ra thành nhiều bữa ăn trong một ngày nhưng vẫn dựa trên tổng lượng calo đã tính.
          </p>
          <br />
          <p>
            Hoặc bạn cũng có thể liên hệ với chúng mình về eat clean, ăn kiêng healthy, giảm cân tự nhiên hay chỉ đơn
            giản là ăn uống lành mạnh hơn để hiệu quả và an toàn nhé!
          </p>
        </div>
      </aside>
      <section className='flex-[3_3_0%] p-5'>
        <h1 className='text-3xl font-bold text-green-500 py-2'>CÔNG CỤ TÍNH TDEE ONLINE</h1>
        <p>Tính lượng calo cần thiết cho cơ thể mỗi ngày</p>
        <p>Cho chúng mình xin vài thông tin để tính TDEE cho bạn nhé.</p>
        <section className='flex gap-x-10 mt-5'>
          <div>
            <h2 className='font-bold text-green-500 text-xl mb-2'>Mục Tiêu</h2>
            <Select defaultValue={expectedBody}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue defaultChecked={true} defaultValue={'decrease'} placeholder='Select target' />
              </SelectTrigger>
              <SelectContent defaultValue={'decrease'}>
                <SelectItem value={ExpectedBodyEnum.ReduceFat}>Giảm mỡ</SelectItem>
                <SelectItem value={ExpectedBodyEnum.BalanceFat}>Duy trì</SelectItem>
                <SelectItem value={ExpectedBodyEnum.IncreaseFat}>Tăng cân</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h2 className='font-bold text-green-500 text-xl mb-2'>Giới tính</h2>
            <RadioGroup
              onValueChange={value => setGender(value as MaleEnum)}
              className='flex py-2'
              defaultValue={gender}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='male' id='male' />
                <Label htmlFor='man'>Nam</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='female' id='female' />
                <Label htmlFor='female'>Nữ</Label>
              </div>
            </RadioGroup>
          </div>
        </section>
        <section className='flex gap-x-10 mt-5 '>
          <BodyIndex title='Tuổi' unit='(Năm)' value={age} handleChangeInput={handleChangeAge} setValue={setAge} />
          <BodyIndex
            title='Chiều cao'
            unit='(Cm)'
            value={height}
            handleChangeInput={handleChangeHeight}
            setValue={setHeight}
          />
          <BodyIndex
            title='Cân nặng'
            unit='(Kg)'
            value={weight}
            handleChangeInput={handleChangeWeight}
            setValue={setWeight}
          />
        </section>
        <section className='mt-5'>
          <h2 className='font-bold text-green-500 mb-2 text-xl'>CƯỜNG ĐỘ TẬP LUYỆN</h2>
          <div className='flex gap-x-4'>
            {listActivityLevel.map((item, index) => (
              <Button
                onClick={() => setLevelExercise(item)}
                className={clsx(
                  'min-w-16 hover:bg-green-50 hover:text-green-500 hover:border-green-500',
                  item === levelExercise ? 'bg-green-50 text-green-500 border-green-500' : ''
                )}
                variant='outline'
                key={item}
              >
                {index}
              </Button>
            ))}
          </div>
          <span className='text-red-400 inline-block mt-2'>{renderExerciseIntensity()}</span>
        </section>
        <section className='flex gap-x-20 mt-5'>
          <div>
            <h2 className='font-bold text-green-500 text-xl mb-2'>Cân nặng mục tiêu</h2>
            <Input
              className='expected-w'
              onChange={e => setExpectedWeight(Number(e.target.value))}
              value={expectedWeight}
              type='number'
            />
          </div>
          <div>
            <h2 className='font-bold text-green-500 text-xl mb-2'>Tốc độ giảm cân</h2>
            <Select value={speedChangeWeight}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue defaultChecked={true} defaultValue={'slow'} />
              </SelectTrigger>
              <SelectContent defaultValue={'normal'}>
                <SelectItem id='slow' value='slow'>
                  Chậm
                </SelectItem>
                <SelectItem id='normal' value='normal'>
                  Bình thường
                </SelectItem>
                <SelectItem id='fast' value='fast'>
                  Nhanh
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        <section className='flex justify-center'>
          <Button
            onClick={caculateTdee}
            disabled={isLoadingTdee}
            variant={'outline'}
            className='my-5 font-bold text-green-500 hover:bg-green-100 hover:text-green-500'
          >
            {isLoadingTdee && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            Tính TDEE
          </Button>
        </section>
        {isLoadingTdee ? (
          <section className='space-y-2 my-5'>
            <Skeleton className='h-6 w-60 rounded-sm' />
            <Skeleton className='h-6 w-60 rounded-sm' />
            <Skeleton className='h-6 w-60 rounded-sm' />
            <Skeleton className='h-6 w-60 rounded-sm' />
          </section>
        ) : (
          <section className='my-5'>
            {!isLoadingTdee && !!yourTdee && (
              <>
                <h2 className='font-bold text-green-500 text-xl mb-2'>TDEE của bạn : {yourTdee}</h2>
                <h2 className='font-semibold text-green-500 text-md mb-2'>
                  Lượng calo cần thiết để <b>Giảm mỡ</b> : {yourTdee - 500} (calo 1 ngày)
                </h2>
                <ul className='list- font-semibold'>
                  <li>Khối lượng protein cần ăn : {protein} g</li>
                  <li>Khối lượng fat cần ăn : {fat} g</li>
                  <li>Khối lượng carb cần ăn : {carb} g</li>
                </ul>
              </>
            )}
          </section>
        )}
        <section className='pt-5 border-t'>
          <h2 className='font-bold text-green-500 text-xl mb-2 text-center'>Bảng thực đơn</h2>
          <Table>
            <TableCaption>Danh sách thực phẩm mỗi ngày</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[200px] font-bold text-xl'>Thực phẩm</TableHead>
                <TableHead className='font-bold text-xl'>Protein</TableHead>
                <TableHead className='font-bold text-xl'>Carb</TableHead>
                <TableHead className='text-right font-bold text-xl'>Fat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodData.map(food => (
                <TableRow key={food.food}>
                  <TableCell className='font-medium'>{food.food}</TableCell>
                  <TableCell className='font-medium'>{food.protein}</TableCell>
                  <TableCell className='font-medium'>{food.carb}</TableCell>
                  <TableCell className='font-medium text-right'>{food.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </section>
    </main>
  );
}
