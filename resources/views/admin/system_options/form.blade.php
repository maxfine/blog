@if($data->name == 'logo')
    {!! Form::single_file_upload('values['. $data->id .']', $data->name, 1, 'qiniu', $data->value, 'logo') !!}
@elseif($data->name !== 'logo')
    <div class="form-group col-sm-12">
        <label class="col-sm-3 control-label">{{ $data->name }}</label>
        <div class="col-sm-9">
            {!! Form::text('values['. $data->id .']', $data->value, ['class'=>'form-control', 'placeholder'=>'请输入'. $data->name]) !!}
        </div>
    </div>
@endif