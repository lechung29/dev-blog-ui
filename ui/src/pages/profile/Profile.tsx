/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef } from "react";
import AppLayout from "../../layout/Layout";
import { Avatar, Box, Container, Stack, TextField } from "@mui/material";
import "./index.scss";
import { Label } from "../../components/common/label/Label";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useImmerState } from "../../hook/useImmerState";
interface IProfilePageOwnProps {}


interface IProfilePageState {
	imageFileUrl?: string;
  displayName?: string;
  email?: string;
}



const Profile: React.FunctionComponent<IProfilePageOwnProps> = (_props) => {
	const user = useSelector((state: RootState) => state.user.user);
  const initialState: IProfilePageState = {
    imageFileUrl: user?.avatar,
    displayName: user?.displayName,
    email: user?.email,
  };
	const [state, setState] = useImmerState<IProfilePageState>(initialState);
	const avatarPickerRef = useRef<HTMLInputElement | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setState({ imageFileUrl: URL.createObjectURL(file) });
		}
	};


	return (
		<AppLayout>
			<Container className="g-profile-section">
				<Box className="g-profile-update-form" component={"section"}>
					<Stack className="g-profile-title-section">
						<Label className="g-profile-primary-title" title={"Thông tin cá nhân"} />
						<Label className="g-profile-sub-title" title={"Quản lý thông tin cá nhân của bạn"} />
					</Stack>
					<Stack className="g-profile-content">
						<Box className="g-profile-content-form">
							<Stack display={"flex"} alignItems={"center"} justifyContent={"center"}>
								<input type="file" accept="image/*" hidden onChange={handleImageChange} ref={avatarPickerRef} />
								<div style={{cursor: "pointer"}} onClick={() => avatarPickerRef.current?.click()}>
                  <Avatar
                    alt={user?.displayName}
                    src={state.imageFileUrl || user?.avatar}
                    sx={{ width: 80, height: 80 }}
                  />
								</div>
							</Stack>
              <TextField
                id="outlined-size-small"
                className="g-update-section-input-item"
                label="Tên hiển thị"
                size="small"
                value={user?.displayName}
              />
						</Box>
					</Stack>
				</Box>
			</Container>
		</AppLayout>
	);
};

export default Profile;
